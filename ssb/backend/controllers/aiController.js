const hairstyleRecommendation = async (req, res) => {

    console.log("AI Controller Called");

    const {
        faceShape,
        hairType,
        hairLength,
        lifestyle,
        beard,
        age
    } = req.body;

    let styles = [];

    // Age
    if (age < 25) {
        styles.push("Textured Crop");
    }

    if (age >= 25 && age <= 40) {
        styles.push("Classic Pompadour");
    }

    if (age > 40) {
        styles.push("Business Cut");
    }

    // Beard
    if (beard === "Full Beard") {
        styles.push("Fade with Beard");
    }

    if (beard === "Light Stubble") {
        styles.push("French Crop");
    }

    if (beard === "Clean Shaven") {
        styles.push("Crew Cut");
    }

    // Face Shape
    if (faceShape === "Oval") {
        styles.push("French Crop", "Pompadour", "Quiff");
    }

    if (faceShape === "Round") {
        styles.push("High Fade", "Side Part", "Spiky Hair");
    }

    if (faceShape === "Square") {
        styles.push("Buzz Cut", "Crew Cut", "Textured Crop");
    }

    if (faceShape === "Heart") {
        styles.push("Undercut", "Messy Fringe", "Side Swept");
    }

    if (faceShape === "Diamond") {
        styles.push("Layered Crop", "Classic Taper", "Brush Up");
    }

    // Hair Type
    if (hairType === "Curly") {
        styles.push("Curly Top Fade");
    }

    if (hairType === "Straight") {
        styles.push("Classic Side Part");
    }

    if (hairType === "Wavy") {
        styles.push("Textured Waves");
    }

    if (hairType === "Coily") {
        styles.push("Afro Fade");
    }

    // Remove duplicates
    styles = [...new Set(styles)];

    // Lifestyle Reason
    let reason = "";

    if (lifestyle === "Professional") {
        reason += "Professional hairstyles with a clean and formal appearance are recommended. ";
    }

    if (lifestyle === "Student") {
        reason += "Modern and trendy hairstyles that are easy to maintain are recommended. ";
    }

    if (lifestyle === "Athlete") {
        reason += "Short hairstyles are ideal because they stay comfortable during sports and workouts. ";
    }

    if (lifestyle === "Minimal Maintenance") {
        reason += "Low-maintenance hairstyles requiring very little styling are recommended. ";
    }

    reason += `Your ${faceShape.toLowerCase()} face shape and ${hairType.toLowerCase()} hair type match these hairstyles very well.`;

    // Maintenance
    let maintenance = "";

    if (hairLength === "Short") {
        maintenance = "Trim every 3 weeks.";
    }

    if (hairLength === "Medium") {
        maintenance = "Trim every 4 weeks.";
    }

    if (hairLength === "Long") {
        maintenance = "Trim every 6 weeks.";
    }

    // Price
    let estimatedPrice = "";

    if (lifestyle === "Professional") {
        estimatedPrice = "₹500 - ₹800";
    } else {
        estimatedPrice = "₹300 - ₹600";
    }

    res.json({
        success: true,
        recommendation: {
            recommendedStyles: styles,
            reason,
            maintenance,
            estimatedPrice,
        },
    });
};

module.exports = {
    hairstyleRecommendation,
};