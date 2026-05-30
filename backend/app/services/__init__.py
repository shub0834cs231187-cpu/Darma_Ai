"""
DermaAI Services
Contains business logic for various features
"""

def calculate_skin_health_score(skin_score, hydration_score, acne_score, risk_score):
    """Calculate overall skin health"""
    weights = {
        'skin_score': 0.40,
        'hydration_score': 0.30,
        'acne_score': -0.20,  # Negative because lower is better
        'risk_score': -0.10   # Negative because lower is better
    }
    
    health_score = (
        skin_score * weights['skin_score'] +
        hydration_score * weights['hydration_score'] +
        (100 - acne_score) * weights['acne_score'] +
        (100 - risk_score) * weights['risk_score']
    )
    
    return max(0, min(100, health_score))

def get_skin_recommendations_by_type(skin_type):
    """Get specific recommendations for skin type"""
    recommendations = {
        "dry": [
            "Use a hydrating cleanser",
            "Apply toner to lock in moisture",
            "Use a rich moisturizer",
            "Apply facial oil as the last step",
            "Use a humidifier"
        ],
        "oily": [
            "Use a gel or foam cleanser",
            "Use oil-free products",
            "Apply lightweight moisturizer",
            "Use mattifying primer",
            "Exfoliate 2-3 times per week"
        ],
        "combination": [
            "Use a gentle cleanser",
            "Apply toner to T-zone",
            "Use different moisturizers for different zones",
            "Use pore-minimizing products on T-zone",
            "Avoid over-moisturizing"
        ],
        "sensitive": [
            "Avoid fragrance and harsh chemicals",
            "Use hypoallergenic products",
            "Perform patch test first",
            "Use minimal products",
            "Avoid hot water"
        ]
    }
    
    return recommendations.get(skin_type, recommendations["combination"])

def match_products_to_skin_type(products, skin_type):
    """Filter products suitable for skin type"""
    # Mock implementation
    return products

def generate_skincare_routine(skin_type, skin_conditions):
    """Generate personalized skincare routine"""
    routine = {
        "morning": [],
        "evening": [],
        "weekly": []
    }
    
    # Add products based on skin type and conditions
    if "acne" in skin_conditions:
        routine["morning"].append("Salicylic acid cleanser")
        routine["evening"].append("Azelaic acid serum")
    
    if "dehydration" in skin_conditions:
        routine["morning"].append("Hydrating toner")
        routine["evening"].append("Rich night cream")
    
    return routine
