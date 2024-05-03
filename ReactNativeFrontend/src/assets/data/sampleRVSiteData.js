const sampleRVSiteData = [
  {
      id: 1,
      SiteName: "Mountain View Campground",
      SiteDescription: "Beautiful campground with mountain views",
      SiteLatitude: 40.1234,
      SiteLongitude: -105.5678,
      SiteType: "RV Park",
      RVElectricAccess: true,
      WaterAccess: true,
      WifiAccess: true,
      CellService: true,
      PetsAllowed: true,
      Recreation: ["hiking", "fishing"],
      SiteRating: 4,
      Comments: [
          { user: "JohnDoe", comment: "Great spot for families" },
          { user: "JaneSmith", comment: "Clean facilities" }
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
      CellService: true,
      PetsAllowed: true,
      Recreation: ["boating", "birdwatching"],
      SiteRating: 5,
      Comments: [
          { user: "OutdoorFanatic", comment: "Perfect for birdwatching" },
          { user: "AdventureSeeker", comment: "Lovely sunset views" }
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
      CellService: true,
      PetsAllowed: true,
      Recreation: ["picnicking", "wildlife viewing"],
      SiteRating: 3,
      Comments: [
          { user: "NatureLover123", comment: "Lots of wildlife sightings" },
          { user: "CampingEnthusiast", comment: "Peaceful and quiet atmosphere" }
      ]
  },
];

export default sampleRVSiteData;

  