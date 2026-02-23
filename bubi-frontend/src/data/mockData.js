// ─── DESTINATIONS ─────────────────────────────────────────
export const destinations = [
  {
    id: 1,
    name: "Victoria Falls",
    slug: "victoria-falls",
    province: "Matabeleland North",
    short_summary: "The world's largest waterfall — a UNESCO World Heritage Site of thundering mist and raw power.",
    description: "Victoria Falls, known locally as 'Mosi-oa-Tunya' (The Smoke That Thunders), is one of the world's most spectacular natural wonders. Straddling the border of Zimbabwe and Zambia, the falls stretch 1,708 metres wide and plunge 108 metres into the Zambezi Gorge. The spray can be seen from 50km away. Beyond the falls, the town offers world-class adventure activities, luxury lodges, and easy access to Hwange National Park.",
    hero_image_url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1600&q=85&fit=crop",
    image_urls: [
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80",
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80"
    ],
    latitude: -17.9243,
    longitude: 25.8572,
    best_months: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    safety_notes: "Generally safe for tourists. Use a registered guide for gorge walks. Keep bags secure in town.",
    travel_tips: "Visit at dawn to beat crowds. Bring a waterproof bag — you WILL get soaked. The Zambia side offers a better view in high-water season.",
    unesco_heritage: true,
    is_featured: true,
    tag: "UNESCO Heritage",
    prices: { budget: { hotel: "25–50", meals: "8–15", activities: "20–60" },
               mid:    { hotel: "80–150", meals: "15–30", activities: "45–120" },
               luxury: { hotel: "200–600", meals: "30–80", activities: "100–300" } }
  },
  {
    id: 2,
    name: "Hwange National Park",
    slug: "hwange",
    province: "Matabeleland North",
    short_summary: "Zimbabwe's largest game reserve — home to 40,000+ elephants and all of Africa's Big Five.",
    description: "Hwange National Park covers 14,651 sq km of pristine wilderness and is Zimbabwe's flagship wildlife destination. It hosts Africa's largest elephant population alongside lions, leopards, wild dogs, and 400+ bird species. The dry season (May–October) concentrates wildlife around the waterholes, making for spectacular game viewing. Accommodation ranges from rustic campsites to exclusive private lodges.",
    hero_image_url: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1600&q=85&fit=crop",
    image_urls: [
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80"
    ],
    latitude: -18.9855,
    longitude: 26.4305,
    best_months: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    safety_notes: "Always stay in your vehicle on game drives unless at designated walking areas. Malaria prophylaxis recommended.",
    travel_tips: "Book camps well in advance for peak season (Jul–Sep). Self-drive is possible but a guide adds enormous value.",
    unesco_heritage: false,
    is_featured: true,
    tag: "Big Five Safari",
    prices: { budget: { hotel: "30–60", meals: "10–18", activities: "40–85" },
               mid:    { hotel: "90–200", meals: "18–35", activities: "85–180" },
               luxury: { hotel: "300–900", meals: "40–100", activities: "150–400" } }
  },
  {
    id: 3,
    name: "Lake Kariba",
    slug: "lake-kariba",
    province: "Mashonaland West",
    short_summary: "Africa's largest man-made lake — a paradise for houseboat cruises, fishing, and sundowner safaris.",
    description: "Lake Kariba stretches 280km along the Zambezi Valley, forming one of Africa's great inland seas. Created by the Kariba Dam in 1959, it's famous for its iconic dead trees rising from the water, spectacular sunsets, tiger fishing, and houseboat holidays. The shores are home to hippo, crocodile, elephant, and prolific birdlife. Matusadona National Park lines the southern shores.",
    hero_image_url: "https://images.unsplash.com/photo-1455218873509-8097305ee378?w=1600&q=85&fit=crop",
    image_urls: [
      "https://images.unsplash.com/photo-1455218873509-8097305ee378?w=800&q=80"
    ],
    latitude: -16.5157,
    longitude: 28.7832,
    best_months: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    safety_notes: "Do not swim in the lake — crocodiles and hippos are present. Follow guide instructions on houseboat safety.",
    travel_tips: "A 3-night houseboat stay is the definitive Kariba experience. Book Kariba town transfers early — flights fill up fast.",
    unesco_heritage: false,
    is_featured: true,
    tag: "Lake Escape",
    prices: { budget: { hotel: "35–70", meals: "10–20", activities: "30–70" },
               mid:    { hotel: "80–200", meals: "15–30", activities: "45–120" },
               luxury: { hotel: "200–500", meals: "35–80", activities: "100–250" } }
  },
  {
    id: 4,
    name: "Great Zimbabwe",
    slug: "great-zimbabwe",
    province: "Masvingo",
    short_summary: "Africa's greatest medieval stone city — the ancient ruins that gave a nation its name.",
    description: "The Great Zimbabwe National Monument is sub-Saharan Africa's largest ancient stone structure, built between the 11th and 15th centuries as the capital of the Kingdom of Zimbabwe. The ruins cover 722 hectares and include the Great Enclosure, the Hill Complex, and the Valley Ruins. The site is surrounded by wildlife at nearby Kyle Game Reserve and the Great Zimbabwe Hotel provides comfortable access.",
    hero_image_url: "https://images.unsplash.com/photo-1591020561829-14af7a30e0af?w=1600&q=85&fit=crop",
    image_urls: [
      "https://images.unsplash.com/photo-1591020561829-14af7a30e0af?w=800&q=80"
    ],
    latitude: -20.2697,
    longitude: 30.9330,
    best_months: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    safety_notes: "The site is safe. Wear sturdy shoes for the Hill Complex — steps are steep and uneven.",
    travel_tips: "Hire a certified guide at the entrance for ≈$10. The museum on-site provides essential context for the ruins.",
    unesco_heritage: true,
    is_featured: false,
    tag: "Ancient Ruins",
    prices: { budget: { hotel: "20–45", meals: "7–15", activities: "10–30" },
               mid:    { hotel: "50–100", meals: "12–25", activities: "25–60" },
               luxury: { hotel: "120–280", meals: "25–60", activities: "60–150" } }
  },
  {
    id: 5,
    name: "Eastern Highlands",
    slug: "eastern-highlands",
    province: "Manicaland",
    short_summary: "Zimbabwe's green mountain escape — misty peaks, waterfalls, trout fishing, and cool highland air.",
    description: "The Eastern Highlands stretch along Zimbabwe's border with Mozambique and offer a dramatic contrast to the country's savanna lowlands. Nyanga National Park features Mount Nyangani (Zimbabwe's highest peak at 2,592m), the spectacular Mtarazi Falls, and excellent hiking. Chimanimani offers serious mountain walking. The region is known for tea and coffee plantations, trout fishing, and a refreshingly cool climate.",
    hero_image_url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=85&fit=crop",
    image_urls: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80"
    ],
    latitude: -18.2196,
    longitude: 32.7572,
    best_months: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    safety_notes: "Mountain weather changes rapidly. Always carry a rain jacket and tell someone your hiking route.",
    travel_tips: "Mutare is the gateway city — fly or drive from Harare (3hrs). Nyanga and Chimanimani are best combined in one trip.",
    unesco_heritage: false,
    is_featured: false,
    tag: "Mountain Escape",
    prices: { budget: { hotel: "20–40", meals: "7–15", activities: "15–40" },
               mid:    { hotel: "50–110", meals: "12–25", activities: "30–80" },
               luxury: { hotel: "120–300", meals: "25–60", activities: "60–180" } }
  }
];

// ─── ACTIVITIES ────────────────────────────────────────────
export const activities = [
  { id:1, destination_id:1, name:"Victoria Falls Bungee Jump", category:"extreme", difficulty:"extreme", price_min:155, price_max:165, duration_hours:2, short_summary:"111m plunge from the Victoria Falls Bridge over the Zambezi Gorge.", image_url:"https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=75&fit=crop", booking_url:"#", whatsapp_number:"+263771234567" },
  { id:2, destination_id:1, name:"Zambezi White Water Rafting", category:"water", difficulty:"challenging", price_min:110, price_max:130, duration_hours:8, short_summary:"Grade 3–5 rapids on the mighty Zambezi — one of the world's top rafting runs.", image_url:"https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=75&fit=crop", booking_url:"#", whatsapp_number:"+263771234568" },
  { id:3, destination_id:1, name:"Sunset Zambezi Cruise", category:"leisure", difficulty:"easy", price_min:40, price_max:55, duration_hours:2, short_summary:"Two-hour sundowner cruise watching hippos and elephants from the water.", image_url:"https://images.unsplash.com/photo-1455218873509-8097305ee378?w=600&q=75&fit=crop", booking_url:"#", whatsapp_number:"+263771234569" },
  { id:4, destination_id:1, name:"Falls Rainforest Walk", category:"scenic", difficulty:"easy", price_min:30, price_max:30, duration_hours:2, short_summary:"Walk through the permanent rainforest created by the falls' spray — you will get drenched.", image_url:"https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=75&fit=crop", booking_url:"#", whatsapp_number:"" },
  { id:5, destination_id:2, name:"Dawn Game Drive Safari", category:"wildlife", difficulty:"easy", price_min:80, price_max:95, duration_hours:4, short_summary:"Expert-guided dawn drive through Africa's largest elephant sanctuary.", image_url:"https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=75&fit=crop", booking_url:"#", whatsapp_number:"+263772345678" },
  { id:6, destination_id:2, name:"Guided Walking Safari", category:"adventure", difficulty:"moderate", price_min:70, price_max:90, duration_hours:4, short_summary:"Track wildlife on foot with an armed professional guide in the bush.", image_url:"https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=75&fit=crop", booking_url:"#", whatsapp_number:"+263772345679" },
  { id:7, destination_id:3, name:"Houseboat Sunset Cruise", category:"leisure", difficulty:"easy", price_min:45, price_max:60, duration_hours:2.5, short_summary:"Watch elephants drink at the shoreline as the sun melts into Lake Kariba.", image_url:"https://images.unsplash.com/photo-1455218873509-8097305ee378?w=600&q=75&fit=crop", booking_url:"#", whatsapp_number:"+263773456789" },
  { id:8, destination_id:3, name:"Tiger Fishing Trip", category:"leisure", difficulty:"easy", price_min:50, price_max:80, duration_hours:5, short_summary:"Fish for the legendary tigerfish — Africa's most prized freshwater game fish.", image_url:"https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=75&fit=crop", booking_url:"#", whatsapp_number:"+263773456790" },
  { id:9, destination_id:4, name:"Great Zimbabwe Guided Tour", category:"cultural", difficulty:"easy", price_min:20, price_max:30, duration_hours:3, short_summary:"Walk through the ancient stone capital with a certified cultural guide.", image_url:"https://images.unsplash.com/photo-1591020561829-14af7a30e0af?w=600&q=75&fit=crop", booking_url:"#", whatsapp_number:"" },
  { id:10, destination_id:5, name:"Mount Nyangani Summit Hike", category:"adventure", difficulty:"challenging", price_min:15, price_max:25, duration_hours:7, short_summary:"Summit Zimbabwe's highest peak at 2,592m with panoramic views into Mozambique.", image_url:"https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=75&fit=crop", booking_url:"#", whatsapp_number:"+263774567890" },
];

// ─── ACCOMMODATIONS ────────────────────────────────────────
export const accommodations = [
  { id:1, destination_id:1, name:"The Victoria Falls Hotel", type:"hotel", tier:"luxury", price_min:350, price_max:650, star_rating:5, short_summary:"Colonial grandeur since 1904 — the grande dame of Victoria Falls hospitality.", image_url:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=75&fit=crop", booking_url:"#", amenities:["Pool","Spa","Restaurant","Game Drives","WiFi"] },
  { id:2, destination_id:1, name:"Shoestrings Backpackers", type:"guesthouse", tier:"budget", price_min:18, price_max:40, star_rating:2, short_summary:"The classic budget base camp — social atmosphere, great info, clean dorms and rooms.", image_url:"https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=75&fit=crop", booking_url:"#", amenities:["WiFi","Bar","Pool","Lockers"] },
  { id:3, destination_id:1, name:"Ilala Lodge", type:"lodge", tier:"mid_range", price_min:180, price_max:280, star_rating:4, short_summary:"Walking distance to the Falls, beautiful gardens, and superb food.", image_url:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=75&fit=crop", booking_url:"#", amenities:["Pool","Restaurant","WiFi","Game Drives","Bar"] },
  { id:4, destination_id:2, name:"Hwange Safari Lodge", type:"lodge", tier:"mid_range", price_min:120, price_max:200, star_rating:3, short_summary:"Overlooking a floodlit waterhole — watch elephants from your veranda at night.", image_url:"https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=75&fit=crop", booking_url:"#", amenities:["Pool","Restaurant","Game Drives","WiFi"] },
  { id:5, destination_id:3, name:"Lakeview Houseboat", type:"houseboat", tier:"mid_range", price_min:200, price_max:400, star_rating:3, short_summary:"Sleep on the water with hippos and crocs as your neighbours — fully catered.", image_url:"https://images.unsplash.com/photo-1455218873509-8097305ee378?w=600&q=75&fit=crop", booking_url:"#", amenities:["Meals Included","Fishing","Sunset Cruise","Bar"] },
  { id:6, destination_id:3, name:"Kariba Safari Lodge", type:"lodge", tier:"mid_range", price_min:120, price_max:180, star_rating:3, short_summary:"Thatched chalets overlooking the lake — game drives to Matusadona included.", image_url:"https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=75&fit=crop", booking_url:"#", amenities:["Pool","Restaurant","Game Drives","WiFi","Bar"] },
];

// ─── TRAVEL ALERTS ─────────────────────────────────────────
export const travelAlerts = [
  { id:1, destination_id:1, title:"Weather Alert", body:"Heavy spray at the Falls — visibility reduced on the Zambia side. Peak flow season. Waterproof gear essential.", severity:"warning", icon:"🌧️" },
  { id:2, destination_id:null, title:"Travel Advisory", body:"New visa-on-arrival available for 78 countries. KAZA UniVisa ($50) covers both Zimbabwe and Zambia.", severity:"info", icon:"📋" },
  { id:3, destination_id:2, title:"Road Conditions", body:"A5 Bulawayo–Hwange road partially repaired. Allow extra travel time. 4WD recommended for park interior.", severity:"warning", icon:"🚧" },
];

// ─── ITINERARY TEMPLATES ────────────────────────────────────
export const itineraryTemplates = {
  "victoria-falls": {
    budget: [
      { day:1, title:"Arrival & Settle In", items:["Check into hostel/budget lodge ($20–40)", "Walk to the Falls viewpoint (free)", "Cook-in or local restaurant meal ($8–12)"], cost:50 },
      { day:2, title:"The Falls", items:["National Park entry ($30)", "Guided rainforest walk (free with entry)", "Local craft market browsing"], cost:45 },
      { day:3, title:"Adventure Lite", items:["Gorge swing or zipline ($50–70)", "Afternoon at Zambezi bank", "Boma dinner ($15)"], cost:90 },
    ],
    mid: [
      { day:1, title:"Arrival & Orientation", items:["Lodge check-in ($90–150)", "Sunset Zambezi cruise ($45)", "Dinner at lodge restaurant ($20–30)"], cost:185 },
      { day:2, title:"The Falls & Rainforest", items:["National Park entry + guide ($60)", "Bridge walk & viewpoints", "Afternoon tea at historic hotel"], cost:80 },
      { day:3, title:"Adventure Day", items:["White water rafting ($120)", "Recovery at pool", "Traditional boma dinner ($30)"], cost:160 },
      { day:4, title:"Wildlife & Sunset", items:["Chobe day trip to Botswana ($160)", "Sunset cruise ($45)", "Farewell dinner ($25)"], cost:230 },
      { day:5, title:"Departure", items:["Craft market shopping ($20–50)", "Late checkout", "Airport transfer ($20)"], cost:70 },
    ],
    luxury: [
      { day:1, title:"VIP Arrival", items:["Private transfer from airport ($80)", "5-star lodge check-in ($350+)", "Welcome dinner & wine ($60)"], cost:490 },
      { day:2, title:"Exclusive Falls Access", items:["Private guided Falls tour ($120)", "Helicopter flight over Falls ($200)", "Lunch at The Victoria Falls Hotel ($50)"], cost:370 },
      { day:3, title:"Ultimate Adventure", items:["Private white-water rafting ($160)", "Spa treatment ($100)", "Fine dining dinner ($80)"], cost:340 },
    ]
  },
  "hwange": {
    mid: [
      { day:1, title:"Bush Arrival", items:["Bush camp check-in ($100–180)", "Evening game drive ($85)", "Dinner under the stars"], cost:270 },
      { day:2, title:"Full Safari Day", items:["Dawn drive ($85)", "Midday waterhole hide ($40)", "Sunset drive ($60)"], cost:185 },
      { day:3, title:"Walking & Departure", items:["Guided bush walk ($75)", "Pack & depart", "Transfer to airport ($60)"], cost:135 },
    ],
    budget: [
      { day:1, title:"Park Arrival", items:["NP campsite ($15–25/night)", "Self-drive game loop (fuel)", "Communal braai evening"], cost:50 },
      { day:2, title:"Game Drive Day", items:["Guided shared game drive ($55)", "Waterhole afternoon", "Camp cooking"], cost:70 },
    ],
    luxury: [
      { day:1, title:"Private Camp Arrival", items:["Luxury tented camp ($400–600)", "Welcome evening drive", "Private chef dinner ($80)"], cost:680 },
      { day:2, title:"Exclusive Safari", items:["Private game drive ($200)", "Guided bush walk ($100)", "Sundowner in the bush ($50)"], cost:350 },
    ]
  },
  "lake-kariba": {
    mid: [
      { day:1, title:"Arrival on the Water", items:["Houseboat check-in ($200–300/night)", "Sundowner as you cruise out", "Fresh tilapia dinner included"], cost:250 },
      { day:2, title:"Lake Life", items:["Morning fishing trip ($50)", "Afternoon swimming & birding", "Sundowner cruise with elephants"], cost:60 },
      { day:3, title:"Matusadona Game Drive", items:["Shore game drive ($80)", "Lunch on board", "Afternoon back to Kariba town"], cost:90 },
    ],
    budget: [
      { day:1, title:"Kariba Town", items:["Guesthouse ($35–50)", "Visit Kariba Dam wall (free)", "Local restaurant meal ($10)"], cost:60 },
      { day:2, title:"Day Cruise", items:["Shared day cruise ($40)", "Fishing & wildlife watching", "Sunset beers at marina"], cost:55 },
    ],
    luxury: [
      { day:1, title:"Private Houseboat", items:["Luxury houseboat ($400–600/night)", "Private sundowner cruise", "Private chef 3-course dinner"], cost:550 },
    ]
  },
  "great-zimbabwe": {
    mid: [
      { day:1, title:"Masvingo Arrival", items:["Great Zimbabwe Hotel ($60–90)", "Afternoon at ruins (entry $10)", "Hotel restaurant dinner ($15–25)"], cost:120 },
      { day:2, title:"Deep Dive: The Ruins", items:["Full guided tour ($25)", "On-site museum visit", "Drive to Lake Mutirikwe ($10)"], cost:45 },
    ],
    budget: [
      { day:1, title:"Ruins Day Trip", items:["Budget guesthouse in Masvingo ($25)", "Ruins entry + self-guided ($10)", "Local restaurant ($7–10)"], cost:45 },
    ],
    luxury: [
      { day:1, title:"Cultural Immersion", items:["Boutique lodge ($150–250)", "Private archaeologist guide ($80)", "Fine dining dinner ($40)"], cost:370 },
    ]
  },
  "eastern-highlands": {
    mid: [
      { day:1, title:"Mutare Arrival", items:["Mountain lodge ($60–100)", "Scenic drive through Vumba", "Lodge dinner ($18–25)"], cost:130 },
      { day:2, title:"Nyanga & Waterfalls", items:["Mtarazi Falls hike ($15 entry)", "Trout lunch at Troutbeck ($25)", "Afternoon birding"], cost:55 },
      { day:3, title:"Chimanimani Trek", items:["Day hike to valley ($10)", "Village cultural experience ($20)", "Return to Mutare"], cost:40 },
    ],
    budget: [
      { day:1, title:"Highland Arrival", items:["Backpacker lodge ($20–35)", "Nyanga village walk (free)", "Self-cater evening"], cost:35 },
      { day:2, title:"Summit Day", items:["Mt Nyangani hike ($10 entry)", "Packed lunch", "Stream swim"], cost:15 },
    ],
    luxury: [
      { day:1, title:"Highland Retreat", items:["Troutbeck Resort ($200–300)", "Fly fishing session ($80)", "4-course dinner ($50)"], cost:430 },
    ]
  }
};

export const costMultipliers = {
  budget:  { low: 0.55, high: 0.70, label: "Budget", icon: "🎒", desc: "Hostels, local transport, self-catering" },
  mid:     { low: 1.00, high: 1.00, label: "Mid-Range", icon: "✈️", desc: "Lodges, guided activities, restaurants" },
  luxury:  { low: 2.20, high: 3.50, label: "Luxury", icon: "🌟", desc: "Private camps, exclusive access, fine dining" },
};
