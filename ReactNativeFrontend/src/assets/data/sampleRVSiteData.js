const sampleRVSiteData = [
  {
      id: 1,
      SiteName: "Mountain View Campground",
      SiteDescription: "Beautiful campground with mountain views",
      SiteLatitude: 37.7234,
      SiteLongitude: -122.5678,
      SiteType: "RV Park",
      RVElectricAccess: true,
      WaterAccess: true,
      WifiAccess: true,
      CellService: [
        {
            "Carrier": "Verizon",
            "Signal": true,
            "SignalStrength": 4
        }
    ],
      PetsAllowed: true,
      Recreation: ["hiking", "fishing"],
      SiteRating: 4,
      Comments: [
          { Username: "JohnDoe", Comment: "Great spot for families" },
          { Username: "JaneSmith", Comment: "Clean facilities" }
      ]
  },
  {
      id: 2,
      SiteName: "Lakefront State Park",
      SiteDescription: "Scenic park by the lake",
      SiteLatitude: 42.3456,
      SiteLongitude: -121.7890,
      SiteType: "State Park",
      RVElectricAccess: true,
      WaterAccess: true,
      WifiAccess: false,
      CellService: [
        {
            "Carrier": "Verizon",
            "Signal": true,
            "SignalStrength": 4
        }
    ],
      PetsAllowed: true,
      Recreation: ["boating", "birdwatching"],
      SiteRating: 5,
      Comments: [
          { Username: "OutdoorFanatic", Comment: "Perfect for birdwatching" },
          { Username: "AdventureSeeker", Comment: "Lovely sunset views" }
      ]
  },
  {
      id: 3,
      SiteName: "Pine Grove Campground",
      SiteDescription: "Serene campground surrounded by pine trees",
      SiteLatitude: 38.9876,
      SiteLongitude: -112.3456,
      SiteType: "County Park",
      RVElectricAccess: true,
      WaterAccess: true,
      WifiAccess: false,
      CellService: [
        {
            "Carrier": "Verizon",
            "Signal": true,
            "SignalStrength": 4
        }
    ],
      PetsAllowed: true,
      Recreation: ["picnicking", "wildlife viewing"],
      SiteRating: 3,
      Comments: [
          { Username: "NatureLover123", Comment: "Lots of wildlife sightings" },
          { Username: "CampingEnthusiast", Comment: "Peaceful and quiet atmosphere" }
      ]
  },
];

export default sampleRVSiteData;

  