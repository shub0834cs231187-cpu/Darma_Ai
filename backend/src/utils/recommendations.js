function generateRecommendations(skinType) {
  const recommendationsMap = {
    dry: {
      morning_routine: [
        { product_id: "1", product_name: "Hydrating Cleanser", step: 1, time: "7:00 AM", reason: "Gentle cleansing without stripping" },
        { product_id: "2", product_name: "Hydrating Toner", step: 2, time: "7:05 AM", reason: "Hydration boost" },
        { product_id: "3", product_name: "Rich Moisturizer", step: 3, time: "7:10 AM", reason: "Deep hydration" },
      ],
      night_routine: [
        { product_id: "1", product_name: "Hydrating Cleanser", step: 1, time: "9:00 PM", reason: "Remove impurities" },
        { product_id: "4", product_name: "Night Cream", step: 2, time: "9:10 PM", reason: "Intense overnight hydration" },
      ],
      weekly_routine: [
        { product_id: "5", product_name: "Hydrating Mask", step: 1, time: "Saturday", reason: "Deep hydration treatment" },
      ],
    },
    oily: {
      morning_routine: [
        { product_id: "6", product_name: "Foaming Cleanser", step: 1, time: "7:00 AM", reason: "Remove excess oil" },
        { product_id: "7", product_name: "Mattifying Toner", step: 2, time: "7:05 AM", reason: "Balance oil production" },
        { product_id: "8", product_name: "Oil-Free Moisturizer", step: 3, time: "7:10 AM", reason: "Lightweight hydration" },
      ],
      night_routine: [
        { product_id: "6", product_name: "Foaming Cleanser", step: 1, time: "9:00 PM", reason: "Deep cleansing" },
        { product_id: "9", product_name: "Lightweight Gel", step: 2, time: "9:10 PM", reason: "Non-greasy care" },
      ],
      weekly_routine: [
        { product_id: "10", product_name: "Clay Mask", step: 1, time: "Sunday", reason: "Oil control treatment" },
      ],
    },
    combination: {
      morning_routine: [
        { product_id: "11", product_name: "Balanced Cleanser", step: 1, time: "7:00 AM", reason: "Gentle yet effective" },
        { product_id: "12", product_name: "Balancing Toner", step: 2, time: "7:05 AM", reason: "pH balance" },
        { product_id: "13", product_name: "Balanced Moisturizer", step: 3, time: "7:10 AM", reason: "Hydration without heaviness" },
      ],
      night_routine: [
        { product_id: "11", product_name: "Balanced Cleanser", step: 1, time: "9:00 PM", reason: "Thorough cleansing" },
        { product_id: "14", product_name: "Night Moisturizer", step: 2, time: "9:10 PM", reason: "Balanced care" },
      ],
      weekly_routine: [
        { product_id: "15", product_name: "Exfoliating Scrub", step: 1, time: "Wednesday", reason: "Gentle exfoliation" },
      ],
    },
  };

  return recommendationsMap[skinType] || recommendationsMap.combination;
}

module.exports = { generateRecommendations };
