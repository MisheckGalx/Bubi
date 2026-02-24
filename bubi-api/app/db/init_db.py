from app.db.session import engine
from app.db.base import Base

# Import all models so SQLAlchemy registers them
from app.models import destination, activity, accommodation, user, itinerary, travel_alert  # noqa


def init_db():
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created.")


if __name__ == "__main__":
    init_db()
