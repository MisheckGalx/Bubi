"""
Run with:  python -m scripts.seed
from the bubi-api directory.
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.session import SessionLocal
from app.db.init_db import init_db
from app.models.destination import Destination
from app.models.activity import Activity
from app.models.accommodation import Accommodation
from app.models.travel_alert import TravelAlert

init_db()
db = SessionLocal()

# ─── DESTINATIONS ─────────────────────────────────────────
destinations = [
    Destination(
        id=1, name="Victoria Falls", slug="victoria-falls",
        province="Matabeleland North",
        short_summary="The world's largest waterfall — a UNESCO World Heritage Site of thundering mist and raw power.",
        description="Victoria Falls, known locally as 'Mosi-oa-Tunya' (The Smoke That Thunders), is one of the world's most spectacular natural wonders. Straddling the border of Zimbabwe and Zambia, the falls stretch 1,708 metres wide and plunge 108 metres into the Zambezi Gorge. The spray can be seen from 50km away. Beyond the falls, the town offers world-class adventure activities, luxury lodges, and easy access to Hwange National Park.",
        hero_image_url="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1600&q=85&fit=crop",
        image_urls=[
            "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80",
            "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
            "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
        ],
        latitude=-17.9243, longitude=25.8572,
        best_months=["Apr","May","Jun","Jul","Aug","Sep"],
        safety_notes="Generally safe for tourists. Use a registered guide for gorge walks. Keep bags secure in town.",
        travel_tips="Visit at dawn to beat crowds. Bring a waterproof bag — you WILL get soaked.",
        unesco_heritage=True, is_featured=True, tag="UNESCO Heritage",
        prices={
            "budget": {"hotel": "25–50", "meals": "8–15", "activities": "20–60"},
            "mid":    {"hotel": "80–150", "meals": "15–30", "activities": "45–120"},
            "luxury": {"hotel": "200–600", "meals": "30–80", "activities": "100–300"},
        },
    ),
    Destination(
        id=2, name="Hwange National Park", slug="hwange",
        province="Matabeleland North",
        short_summary="Zimbabwe's largest game reserve — home to 40,000+ elephants and all of Africa's Big Five.",
        description="Hwange National Park covers 14,651 sq km of pristine wilderness and is Zimbabwe's flagship wildlife destination. It hosts Africa's largest elephant population alongside lions, leopards, wild dogs, and 400+ bird species.",
        hero_image_url="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1600&q=85&fit=crop",
        image_urls=["https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80"],
        latitude=-18.9855, longitude=26.4305,
        best_months=["May","Jun","Jul","Aug","Sep","Oct"],
        safety_notes="Always stay in your vehicle on game drives unless at designated walking areas. Malaria prophylaxis recommended.",
        travel_tips="Book camps well in advance for peak season (Jul–Sep). Self-drive is possible but a guide adds enormous value.",
        unesco_heritage=False, is_featured=True, tag="Big Five Safari",
        prices={
            "budget": {"hotel": "30–60", "meals": "10–18", "activities": "40–85"},
            "mid":    {"hotel": "90–200", "meals": "18–35", "activities": "85–180"},
            "luxury": {"hotel": "300–900", "meals": "40–100", "activities": "150–400"},
        },
    ),
    Destination(
        id=3, name="Lake Kariba", slug="lake-kariba",
        province="Mashonaland West",
        short_summary="Africa's largest man-made lake — a paradise for houseboat cruises, fishing, and sundowner safaris.",
        description="Lake Kariba stretches 280km along the Zambezi Valley. Created by the Kariba Dam in 1959, it's famous for its iconic dead trees rising from the water, spectacular sunsets, tiger fishing, and houseboat holidays.",
        hero_image_url="https://images.unsplash.com/photo-1455218873509-8097305ee378?w=1600&q=85&fit=crop",
        image_urls=["https://images.unsplash.com/photo-1455218873509-8097305ee378?w=800&q=80"],
        latitude=-16.5157, longitude=28.7832,
        best_months=["Apr","May","Jun","Jul","Aug","Sep","Oct"],
        safety_notes="Do not swim in the lake — crocodiles and hippos are present.",
        travel_tips="A 3-night houseboat stay is the definitive Kariba experience.",
        unesco_heritage=False, is_featured=True, tag="Lake Escape",
        prices={
            "budget": {"hotel": "35–70", "meals": "10–20", "activities": "30–70"},
            "mid":    {"hotel": "80–200", "meals": "15–30", "activities": "45–120"},
            "luxury": {"hotel": "200–500", "meals": "35–80", "activities": "100–250"},
        },
    ),
    Destination(
        id=4, name="Great Zimbabwe", slug="great-zimbabwe",
        province="Masvingo",
        short_summary="Africa's greatest medieval stone city — the ancient ruins that gave a nation its name.",
        description="The Great Zimbabwe National Monument is sub-Saharan Africa's largest ancient stone structure, built between the 11th and 15th centuries as the capital of the Kingdom of Zimbabwe.",
        hero_image_url="https://images.unsplash.com/photo-1591020561829-14af7a30e0af?w=1600&q=85&fit=crop",
        image_urls=["https://images.unsplash.com/photo-1591020561829-14af7a30e0af?w=800&q=80"],
        latitude=-20.2697, longitude=30.9330,
        best_months=["Apr","May","Jun","Jul","Aug","Sep"],
        safety_notes="The site is safe. Wear sturdy shoes for the Hill Complex — steps are steep and uneven.",
        travel_tips="Hire a certified guide at the entrance for ~$10.",
        unesco_heritage=True, is_featured=False, tag="Ancient Ruins",
        prices={
            "budget": {"hotel": "20–45", "meals": "7–15", "activities": "10–30"},
            "mid":    {"hotel": "50–100", "meals": "12–25", "activities": "25–60"},
            "luxury": {"hotel": "120–280", "meals": "25–60", "activities": "60–150"},
        },
    ),
    Destination(
        id=5, name="Eastern Highlands", slug="eastern-highlands",
        province="Manicaland",
        short_summary="Zimbabwe's green mountain escape — misty peaks, waterfalls, trout fishing, and cool highland air.",
        description="The Eastern Highlands stretch along Zimbabwe's border with Mozambique. Nyanga National Park features Mount Nyangani (Zimbabwe's highest peak at 2,592m), the spectacular Mtarazi Falls, and excellent hiking.",
        hero_image_url="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=85&fit=crop",
        image_urls=["https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80"],
        latitude=-18.2196, longitude=32.7572,
        best_months=["Apr","May","Jun","Jul","Aug","Sep","Oct"],
        safety_notes="Mountain weather changes rapidly. Always carry a rain jacket.",
        travel_tips="Mutare is the gateway city — fly or drive from Harare (3hrs).",
        unesco_heritage=False, is_featured=False, tag="Mountain Escape",
        prices={
            "budget": {"hotel": "20–40", "meals": "7–15", "activities": "15–40"},
            "mid":    {"hotel": "50–110", "meals": "12–25", "activities": "30–80"},
            "luxury": {"hotel": "120–300", "meals": "25–60", "activities": "60–180"},
        },
    ),
]

# ─── ACTIVITIES ────────────────────────────────────────────
activities = [
    Activity(id=1, destination_id=1, name="Victoria Falls Bungee Jump", category="extreme", difficulty="extreme", price_min=155, price_max=165, duration_hours=2, short_summary="111m plunge from the Victoria Falls Bridge over the Zambezi Gorge.", image_url="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=75&fit=crop", booking_url="#", whatsapp_number="+263771234567"),
    Activity(id=2, destination_id=1, name="Zambezi White Water Rafting", category="water", difficulty="challenging", price_min=110, price_max=130, duration_hours=8, short_summary="Grade 3–5 rapids on the mighty Zambezi — one of the world's top rafting runs.", image_url="https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=75&fit=crop", booking_url="#", whatsapp_number="+263771234568"),
    Activity(id=3, destination_id=1, name="Sunset Zambezi Cruise", category="leisure", difficulty="easy", price_min=40, price_max=55, duration_hours=2, short_summary="Two-hour sundowner cruise watching hippos and elephants from the water.", image_url="https://images.unsplash.com/photo-1455218873509-8097305ee378?w=600&q=75&fit=crop", booking_url="#", whatsapp_number="+263771234569"),
    Activity(id=4, destination_id=1, name="Falls Rainforest Walk", category="scenic", difficulty="easy", price_min=30, price_max=30, duration_hours=2, short_summary="Walk through the permanent rainforest created by the falls' spray.", image_url="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=75&fit=crop", booking_url="#", whatsapp_number=""),
    Activity(id=5, destination_id=2, name="Dawn Game Drive Safari", category="wildlife", difficulty="easy", price_min=80, price_max=95, duration_hours=4, short_summary="Expert-guided dawn drive through Africa's largest elephant sanctuary.", image_url="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=75&fit=crop", booking_url="#", whatsapp_number="+263772345678"),
    Activity(id=6, destination_id=2, name="Guided Walking Safari", category="adventure", difficulty="moderate", price_min=70, price_max=90, duration_hours=4, short_summary="Track wildlife on foot with an armed professional guide in the bush.", image_url="https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=75&fit=crop", booking_url="#", whatsapp_number="+263772345679"),
    Activity(id=7, destination_id=3, name="Houseboat Sunset Cruise", category="leisure", difficulty="easy", price_min=45, price_max=60, duration_hours=2.5, short_summary="Watch elephants drink at the shoreline as the sun melts into Lake Kariba.", image_url="https://images.unsplash.com/photo-1455218873509-8097305ee378?w=600&q=75&fit=crop", booking_url="#", whatsapp_number="+263773456789"),
    Activity(id=8, destination_id=3, name="Tiger Fishing Trip", category="leisure", difficulty="easy", price_min=50, price_max=80, duration_hours=5, short_summary="Fish for the legendary tigerfish — Africa's most prized freshwater game fish.", image_url="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=75&fit=crop", booking_url="#", whatsapp_number="+263773456790"),
    Activity(id=9, destination_id=4, name="Great Zimbabwe Guided Tour", category="cultural", difficulty="easy", price_min=20, price_max=30, duration_hours=3, short_summary="Walk through the ancient stone capital with a certified cultural guide.", image_url="https://images.unsplash.com/photo-1591020561829-14af7a30e0af?w=600&q=75&fit=crop", booking_url="#", whatsapp_number=""),
    Activity(id=10, destination_id=5, name="Mount Nyangani Summit Hike", category="adventure", difficulty="challenging", price_min=15, price_max=25, duration_hours=7, short_summary="Summit Zimbabwe's highest peak at 2,592m with panoramic views into Mozambique.", image_url="https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=75&fit=crop", booking_url="#", whatsapp_number="+263774567890"),
]

# ─── ACCOMMODATIONS ────────────────────────────────────────
accommodations = [
    Accommodation(id=1, destination_id=1, name="The Victoria Falls Hotel", accommodation_type="hotel", tier="luxury", price_min=350, price_max=650, star_rating=5, short_summary="Colonial grandeur since 1904 — the grande dame of Victoria Falls hospitality.", image_url="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=75&fit=crop", booking_url="#", amenities=["Pool","Spa","Restaurant","Game Drives","WiFi"]),
    Accommodation(id=2, destination_id=1, name="Shoestrings Backpackers", accommodation_type="guesthouse", tier="budget", price_min=18, price_max=40, star_rating=2, short_summary="The classic budget base camp — social atmosphere, great info, clean dorms and rooms.", image_url="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=75&fit=crop", booking_url="#", amenities=["WiFi","Bar","Pool","Lockers"]),
    Accommodation(id=3, destination_id=1, name="Ilala Lodge", accommodation_type="lodge", tier="mid_range", price_min=180, price_max=280, star_rating=4, short_summary="Walking distance to the Falls, beautiful gardens, and superb food.", image_url="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=75&fit=crop", booking_url="#", amenities=["Pool","Restaurant","WiFi","Game Drives","Bar"]),
    Accommodation(id=4, destination_id=2, name="Hwange Safari Lodge", accommodation_type="lodge", tier="mid_range", price_min=120, price_max=200, star_rating=3, short_summary="Overlooking a floodlit waterhole — watch elephants from your veranda at night.", image_url="https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=75&fit=crop", booking_url="#", amenities=["Pool","Restaurant","Game Drives","WiFi"]),
    Accommodation(id=5, destination_id=3, name="Lakeview Houseboat", accommodation_type="houseboat", tier="mid_range", price_min=200, price_max=400, star_rating=3, short_summary="Sleep on the water with hippos and crocs as your neighbours — fully catered.", image_url="https://images.unsplash.com/photo-1455218873509-8097305ee378?w=600&q=75&fit=crop", booking_url="#", amenities=["Meals Included","Fishing","Sunset Cruise","Bar"]),
    Accommodation(id=6, destination_id=3, name="Kariba Safari Lodge", accommodation_type="lodge", tier="mid_range", price_min=120, price_max=180, star_rating=3, short_summary="Thatched chalets overlooking the lake — game drives to Matusadona included.", image_url="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=75&fit=crop", booking_url="#", amenities=["Pool","Restaurant","Game Drives","WiFi","Bar"]),
]

# ─── TRAVEL ALERTS ─────────────────────────────────────────
alerts = [
    TravelAlert(id=1, destination_id=1, title="Weather Alert", body="Heavy spray at the Falls — visibility reduced on the Zambia side. Peak flow season. Waterproof gear essential.", severity="warning", icon="🌧️", is_active=True),
    TravelAlert(id=2, destination_id=None, title="Travel Advisory", body="New visa-on-arrival available for 78 countries. KAZA UniVisa ($50) covers both Zimbabwe and Zambia.", severity="info", icon="📋", is_active=True),
    TravelAlert(id=3, destination_id=2, title="Road Conditions", body="A5 Bulawayo–Hwange road partially repaired. Allow extra travel time. 4WD recommended for park interior.", severity="warning", icon="🚧", is_active=True),
]

# ─── SEED ──────────────────────────────────────────────────
try:
    # Clear existing
    db.query(TravelAlert).delete()
    db.query(Accommodation).delete()
    db.query(Activity).delete()
    db.query(Destination).delete()
    db.commit()

    db.add_all(destinations)
    db.commit()
    db.add_all(activities)
    db.add_all(accommodations)
    db.add_all(alerts)
    db.commit()
    print("✅ Database seeded successfully!")
    print(f"   → {len(destinations)} destinations")
    print(f"   → {len(activities)} activities")
    print(f"   → {len(accommodations)} accommodations")
    print(f"   → {len(alerts)} travel alerts")
except Exception as e:
    db.rollback()
    print(f"❌ Seed failed: {e}")
finally:
    db.close()
