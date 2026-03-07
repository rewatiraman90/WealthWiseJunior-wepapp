export interface Activity {
    id: string;
    grade: number;
    title: string;
    theoryLink: string;
    instructions: string;
    placeholder: string;
    rewards: {
        xp: number;
        rupees: number;
        badge?: string;
    };
}

export const gradeActivities: Activity[] = [
    // Class 5
    {
        id: "c5-apr-barter",
        grade: 5,
        title: "The Barter Swap",
        theoryLink: "April - The Barter Age",
        instructions: "Find an old toy and try to trade it for something else with a friend or sibling. Log who you traded with and if it was hard!",
        placeholder: "I traded my toy car with Rahul for a puzzle. It was hard because...",
        rewards: { xp: 100, rupees: 50, badge: "Swap Master" }
    },
    // Class 6
    {
        id: "c6-may-currency",
        grade: 6,
        title: "The Currency Converter",
        theoryLink: "May - World Currencies",
        instructions: "Check the value of 1 US Dollar, 1 Euro, and 1 British Pound in Indian Rupees today. Why are they different?",
        placeholder: "1 USD = ₹83, 1 Euro = ₹90... I think they are different because...",
        rewards: { xp: 150, rupees: 60, badge: "Global Explorer" }
    },
    // Class 7
    {
        id: "c7-jul-upi",
        grade: 7,
        title: "The QR Code Detective",
        theoryLink: "July - The UPI Revolution",
        instructions: "With a parent, observe 3 different shops using UPI. Do they use PhonePe, GPay, or BharatPe? Is it faster than cash?",
        placeholder: "The vegetable vendor used BharatPe. It was much faster than finding change...",
        rewards: { xp: 200, rupees: 80, badge: "Digital Native" }
    },
    // Class 8
    {
        id: "c8-may-inflation",
        grade: 8,
        title: "The Price-Point Hunt",
        theoryLink: "May - Inflation",
        instructions: "Interview parents about the price of 1kg Atta or 1L Milk in 2015 vs today. List the increase.",
        placeholder: "Milk: 2015 - ₹35, Today - ₹65. Increase of ₹30...",
        rewards: { xp: 250, rupees: 100, badge: "Shadow Hunter" }
    },
    // Class 9
    {
        id: "c9-aug-stocks",
        grade: 9,
        title: "The Nifty-50 Tracker",
        theoryLink: "August - The Stock Market",
        instructions: "Pick any 3 companies from the Nifty-50 list. Check their stock price for 3 days and see if they move together.",
        placeholder: "Reliance went up, but Infosys went down today. They don't always move together...",
        rewards: { xp: 350, rupees: 150, badge: "Market Watcher" }
    },
    // Class 10
    {
        id: "c10-jun-gst",
        grade: 10,
        title: "The GST Auditor",
        theoryLink: "June - GST Basics",
        instructions: "Find a restaurant bill and a stationery bill. Compare the GST percentage. Why is one higher?",
        placeholder: "Restaurant was 5% GST, the pen was 12%. I think luxury items have more tax...",
        rewards: { xp: 500, rupees: 250, badge: "Tax Pro" }
    },
    // Class 11
    {
        id: "c11-sep-diversify",
        grade: 11,
        title: "The 1-Lakh Portfolio Simulation",
        theoryLink: "September - Diversification",
        instructions: "Divide ₹1,00,000 into Stocks, Gold, and FDs. Explain why you chose that ratio.",
        placeholder: "I put 60% in stocks for growth and 20% in gold for safety...",
        rewards: { xp: 750, rupees: 400, badge: "Risk Manager" }
    },
    // Class 12
    {
        id: "c12-apr-mumbai",
        grade: 12,
        title: "The Mumbai Survival Simulation",
        theoryLink: "April - Financial Independence (FIRE)",
        instructions: "Research PG rent, travel, and food for a ₹40k salary in Mumbai. Can you save 20%?",
        placeholder: "A PG in Andheri is ₹15k, food ₹8k... I can only save 10% unless I...",
        rewards: { xp: 1000, rupees: 500, badge: "Survivalist" }
    }
];
