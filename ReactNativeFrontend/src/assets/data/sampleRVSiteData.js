const sampleRVSiteData= [
    {
      "name": "Mountain View Campground",
      "gps_location": "40.1234,-105.5678",
      "campsite_type": "RV Park",
      "site_identifier": "Site 22",
      "rv_services": ["electric", "dump"],
      "water_available": true,
      "pets_ok": true,
      "wifi_available": true,
      "cell_service": {
        "carrier": "Verizon",
        "average_bars": 3
      },
      "nearby_recreation": ["hiking", "fishing"],
      "public_or_private": "Public",
      "add_to_trip": "New Trip"
    },
    {
      "name": "Lakefront State Park",
      "gps_location": "42.3456,-121.7890",
      "campsite_type": "State Park",
      "site_identifier": "Site 7B",
      "rv_services": ["electric", "water"],
      "water_available": true,
      "pets_ok": true,
      "wifi_available": false,
      "cell_service": {
        "carrier": "AT&T",
        "average_bars": 2
      },
      "nearby_recreation": ["boating", "birdwatching"],
      "public_or_private": "Public",
      "add_to_trip": "Existing Trip"
    },
    {
      "name": "Pine Grove Campground",
      "gps_location": "38.9876,-112.3456",
      "campsite_type": "County Park",
      "site_identifier": null,
      "rv_services": ["electric", "dump", "water"],
      "water_available": true,
      "pets_ok": true,
      "wifi_available": false,
      "cell_service": {
        "carrier": "T-Mobile",
        "average_bars": 1
      },
      "nearby_recreation": ["picnicking", "wildlife viewing"],
      "public_or_private": "Public",
      "add_to_trip": "New Trip"
    },
    {
      "name": "River's Edge Campground",
      "gps_location": "36.7890,-85.6789",
      "campsite_type": "RV Park",
      "site_identifier": "Site 15",
      "rv_services": ["electric", "water", "wifi"],
      "water_available": true,
      "pets_ok": false,
      "wifi_available": true,
      "cell_service": {
        "carrier": "Sprint",
        "average_bars": 2
      },
      "nearby_recreation": ["kayaking", "biking"],
      "public_or_private": "Private",
      "add_to_trip": "Existing Trip"
    },
    {
      "name": "Sunrise Canyon Campground",
      "gps_location": "33.4567,-112.8901",
      "campsite_type": "Public Land",
      "site_identifier": null,
      "rv_services": ["dump"],
      "water_available": false,
      "pets_ok": true,
      "wifi_available": false,
      "cell_service": {
        "carrier": "Verizon",
        "average_bars": 1
      },
      "nearby_recreation": ["off-roading", "star-gazing"],
      "public_or_private": "Public",
      "add_to_trip": "New Trip"
    }
]

export default sampleRVSiteData;
  