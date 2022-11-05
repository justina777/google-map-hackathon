"""
Usage:
  ward.py crawl <file>
  ward.py generate <type> <file>

Options:
  -h --help     Show this screen.
  
"""
from docopt import docopt
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import os, pandas, csv
import json
import math
from random import *

IMPLICT_WAIT = 15
def fetch_ward(args):
    projects = pandas.read_csv(args["<file>"], index_col=None, header=0, delimiter=';')
    browser = webdriver.Chrome()
    fieldnames = ['full_addr', 'address', 'city','postal_code','lat', 'lng']
    with open('addr_to_coor_report.txt', 'w+', newline='\n', encoding='utf8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames, delimiter=';')
        writer.writeheader()
        for index, row in projects.iterrows():
            ob  = {}
            for rr in fieldnames:
                if rr != 'lat' and rr != 'lng':
                    ob[rr] = row[rr]
            addr = row['full_addr']
            
            url = "https://www.google.com/maps/search/"+addr

            
            browser.get(url)
            time.sleep(randint(5, 10))

            print(index, browser.current_url)
            str_url = browser.current_url
            str_url = str_url[str_url.index('@43'):]
            if '/' in str_url:
                str_url = str_url[:str_url.index('/')]
            print(str_url.split(',')[0],str_url.split(',')[1])
            ob['lat'] = str_url.split(',')[0].replace('@','')
            ob['lng'] = str_url.split(',')[1].replace('@','')
            writer.writerow(ob)

            if index % 30 == 0 and index > 0:
                browser.close()
                browser = webdriver.Chrome()
                print(index, '====== restart browser =======')
            # time.sleep(randint(1, 2))
            # break
        csvfile.close()
    browser.close()
def generate(args):
    if args['<type>'] == 'to_geojson':
        projects = pandas.read_csv(args["<file>"], index_col=None, header=0, delimiter=';')
        obJson = {}
        obJson['type'] =  "FeatureCollection"
        obJson['name'] =  "energy_consumption"
        ob_crs = {}
        ob_crs['type'] = "name"
        ob_pp = {}
        ob_pp['name'] = 'urn:ogc:def:crs:OGC:1.3:CRS84'
        ob_crs['properties'] = ob_pp
        obJson['crs'] = ob_crs
        json_arr = []
        for index, row in projects.iterrows():
            if pandas.isnull(row['lat']):
                continue

            ob = {}
            ob['type'] = "Feature"
            ob_properties = {}
            ob_properties['_id'] = index+1
            ob_properties['ADDRESS_FULL'] = row['address']
            ob_properties['POSTAL_CODE'] = row['postal_code']
            ob_properties["CITY"] = row['city']
            ob_properties["radius"] = row['ele_quantity']
            ob['properties'] = ob_properties
            ob_geometry = {}
            # ob_geometry['type'] = "LineString"
            # ob_geometry['coordinates'] = [[row['lat'], row['lng']],[row['lat'], row['lng']]]
            ob_geometry['type'] = "Point"
            ob_geometry['coordinates'] = [row['lat'], row['lng']]
            ob['geometry'] = ob_geometry
            json_arr.append(ob)
            # { "type": "Feature", "properties": { "_id": 1, "ADDRESS_POINT_ID": 20006001, "ADDRESS_POINT_ID_LINK": null, "ADDRESS_NUMBER": 9, "LINEAR_NAME_FULL": "Hanna Ave", "ADDRESS_FULL": "9 Hanna Ave", "POSTAL_CODE": "M6K 1W8", "MUNICIPALITY": "former Toronto", "CITY": "Toronto", "WARD": "Spadina-Fort York (10 )", "PLACE_NAME": null, "GENERAL_USE_CODE": 113001, "GENERAL_USE": "Industrial Location", "CENTRELINE_ID": 1147118, "CENTRELINE_SIDE": "R", "CENTRELINE_MEASURE": -47.66, "ADDRESS_CLASS_DESC": "Land", "LO_NUM": 9, "LO_NUM_SUF": null, "HI_NUM": null, "HI_NUM_SUF": null, "LINEAR_NAME_ID": 3602, "X": null, "Y": null, "LONGITUDE": null, "LATITUDE": null, "ID": 1, "BUILDING_NAME": "Traffic Services and Garage", "CLIENT_ADDRESS": "9 Hanna Ave", "TYPE_INSTALL": "FIT 1", "YEAR_INSTALL": "Mar 31, 2010", "SIZE_INSTALL": 50.0, "UNIT_MAX_POWER": null, "ENERGY_OUTPUT": null, "UNIT_ANNUAL": null, "LANDLORD": null, "SYSTEM_OWNERSHIP": null, "FORMER_MUNICIPALITY": null, "CLIENT_ADDR_POINT_ID": 20006001, "OBJECTID": 1 }, "geometry": { "type": "Point", "coordinates": [ -79.417220801414004, 43.637622836734202 ] } },

            if (index > 10):
                break

        obJson['features'] = json_arr
        with open('energy_consumption_2015_2020.geojson', 'w+', newline='\n', encoding='utf8') as wFile:
            wFile.write(json.dumps(obJson))
            wFile.close()
    elif args['<type>'] == 'to_heatmap':
        projects = pandas.read_csv(args["<file>"], index_col=None, header=0, delimiter=';')
        
        obJson = {}
        obLocs = []
        for index, row in projects.iterrows():
            if pandas.isnull(row['lat']):
                continue
            
            obLoc = {}
            obLoc['lng'] =  row['lat']
            obLoc['lat'] =  row['lng']
            if row['ele_quantity'] == 0:
                continue
        
            weight = 0
            if row['ele_quantity'] > 0:
                weight = round(math.log(row['ele_quantity']), 2)
            # if weight == 0:
            #     print("{location: new google.maps.LatLng(",row['lng'],",",row['lat'],"), weight: ",0,"},")
            # else:
            #     print("{location: new google.maps.LatLng(",row['lng'],",",row['lat'],"), weight: ",weight,"},")
            obLoc['weight'] = weight
            obLoc['ele_quantity'] = row['ele_quantity']
            obLoc['gas_quantity'] = row['gas_quantity']
            obLoc['year'] = row['year']
            obLocs.append(obLoc)
        
        obJson['locations'] = obLocs

        with open('energy_consumption.json', 'w+', newline='\n', encoding='utf8') as wFile:
            wFile.write(json.dumps(obJson))
            wFile.close()
if __name__== "__main__":
    
    args = docopt(__doc__)

    if bool(args['crawl']):
        fetch_ward(args)
    elif bool(args['generate']):
        generate(args)