export interface VideoAssessment {
    question: string;
    options: [string, string, string, string];
    answer: number; // 0-3
    explanation: string;
}

export interface VideoClass {
    id: string; // e.g. "g5-m1-w1-mon"
    grade: number;
    month: number; // 1=March, 2=April ... 10=December
    week: number;  // 1-4
    day: 'Mon' | 'Wed' | 'Fri';
    topic: string;
    description: string;
    youtubeId: string;
    channel: string;
    durationMin: number;
    assessment: [VideoAssessment, VideoAssessment, VideoAssessment];
}

// Month names for display
export const MONTHS = ['March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Get Monday date of week (week 1 of March = first Monday of March 2026)
export function getWeekDate(month: number, week: number, day: 'Mon' | 'Wed' | 'Fri'): Date {
    const year = 2026;
    const monthIndex = month + 1; // month 1=March => index 2
    const d = new Date(year, monthIndex, 1);
    // Find first Monday
    const firstMonday = new Date(d);
    const dow = d.getDay();
    const diff = dow === 0 ? 1 : dow === 1 ? 0 : 8 - dow;
    firstMonday.setDate(1 + diff);
    // Add weeks
    const baseDate = new Date(firstMonday);
    baseDate.setDate(baseDate.getDate() + (week - 1) * 7);
    // Offset for day
    const dayOffset = { Mon: 0, Wed: 2, Fri: 4 };
    baseDate.setDate(baseDate.getDate() + dayOffset[day]);
    return baseDate;
}

// Calculate current week number (month 1-10, week 1-4)
export function getCurrentWeekInfo(): { month: number; week: number } {
    const now = new Date();
    for (let m = 1; m <= 10; m++) {
        for (let w = 1; w <= 4; w++) {
            const monDate = getWeekDate(m, w, 'Mon');
            const friDate = getWeekDate(m, w, 'Fri');
            if (now >= monDate && now <= friDate) return { month: m, week: w };
        }
    }
    return { month: 1, week: 1 };
}

// ── CLASS 5 SCHEDULE ──────────────────────────────────────────
const grade5: VideoClass[] = [
    // MARCH - WEEK 1
    {
        id: 'g5-m1-w1-mon', grade: 5, month: 1, week: 1, day: 'Mon', topic: 'What Is Money?', description: 'Understand why humans invented money and how it replaced barter.', youtubeId: 'al5bHhcn2TY', channel: 'Wion Kids', durationMin: 8,
        assessment: [
            { question: 'What did people use before money was invented?', options: ['Gold coins', 'Barter system', 'Paper notes', 'Credit cards'], answer: 1, explanation: 'Before money, people exchanged goods directly — this was called the barter system.' },
            { question: 'Which of these is NOT a function of money?', options: ['Medium of exchange', 'Store of value', 'Growing crops', 'Unit of account'], answer: 2, explanation: 'Money has 3 main functions: medium of exchange, store of value, and unit of account. Growing crops is not one.' },
            { question: 'Why was barter inconvenient?', options: ['It was illegal', 'It required double coincidence of wants', 'It used too much gold', 'Banks refused it'], answer: 1, explanation: 'Barter needed both parties to want exactly what the other had — called "double coincidence of wants". Very inconvenient!' }
        ]
    },
    {
        id: 'g5-m1-w1-wed', grade: 5, month: 1, week: 1, day: 'Wed', topic: 'History of Money', description: 'From cowrie shells to UPI — trace the 5000-year journey of money.', youtubeId: 'RC2JMkfBRFY', channel: 'TED-Ed', durationMin: 5,
        assessment: [
            { question: 'What were some of the earliest forms of money?', options: ['Paper notes', 'Cowrie shells and metals', 'Plastic cards', 'Bitcoin'], answer: 1, explanation: 'Cowrie shells and metals like gold and silver were among the earliest forms of money used by civilizations.' },
            { question: 'When did India start printing paper currency?', options: ['1600s', '1770s', '1900s', '1947'], answer: 1, explanation: 'India\'s paper currency system began around 1770 under the Bank of Hindustan.' },
            { question: 'What does "fiat money" mean?', options: ['Money backed by gold', 'Money that works like barter', 'Money declared legal by government', 'Money from Italy'], answer: 2, explanation: 'Fiat money has value because the government declares it legal tender — not because it\'s backed by gold.' }
        ]
    },
    {
        id: 'g5-m1-w1-fri', grade: 5, month: 1, week: 1, day: 'Fri', topic: 'Needs vs Wants', description: 'Learn the difference between needs (must have) and wants (nice to have) with real examples.', youtubeId: 'xri-wkBYam0', channel: 'Miacademy Learning Channel', durationMin: 6,
        assessment: [
            { question: 'Which of these is a NEED?', options: ['New video game', 'Movie ticket', 'Food and water', 'Fancy shoes'], answer: 2, explanation: 'Food and water are needs — things you cannot survive without. The others are wants.' },
            { question: 'You have ₹500. Rice costs ₹200. A toy costs ₹400. What should you buy first?', options: ['The toy', 'Both together', 'The rice', 'Neither'], answer: 2, explanation: 'Always meet your needs first. Rice (food) is a need. The toy is a want.' },
            { question: 'Why is it important to know the difference between needs and wants?', options: ['To impress friends', 'To spend all money fast', 'To make better money decisions', 'To avoid saving'], answer: 2, explanation: 'Knowing needs vs wants helps you prioritize spending and avoid wasting money on things that aren\'t important.' }
        ]
    },
    // MARCH - WEEK 2
    {
        id: 'g5-m1-w2-mon', grade: 5, month: 1, week: 2, day: 'Mon', topic: 'Coins and Notes in India', description: 'How Indian Rupee notes and coins are made, and what the symbols mean.', youtubeId: '0UfN1cBJaog', channel: 'RBI Films', durationMin: 7,
        assessment: [
            { question: 'Who prints currency notes in India?', options: ['State Bank of India', 'Income Tax Department', 'Reserve Bank of India', 'Finance Ministry'], answer: 2, explanation: 'The Reserve Bank of India (RBI) is responsible for issuing and regulating currency in India.' },
            { question: 'What is the symbol ₹ called?', options: ['Rupee sign', 'Indian Franc', 'Desi Dollar', 'Lakh mark'], answer: 0, explanation: '₹ is the official currency symbol for the Indian Rupee, designed by D. Udaya Kumar in 2010.' },
            { question: 'Who controls the money supply in India?', options: ['Prime Minister', 'RBI Governor', 'Stock Market', 'World Bank'], answer: 1, explanation: 'The RBI Governor oversees monetary policy and controls how much money is in circulation.' }
        ]
    },
    {
        id: 'g5-m1-w2-wed', grade: 5, month: 1, week: 2, day: 'Wed', topic: 'Saving — Your First Superpower', description: 'Why saving is the foundation of financial freedom and how to start right now.', youtubeId: 'CJpwOeIjJ0M', channel: 'Sundaram Mutual', durationMin: 5,
        assessment: [
            { question: 'What is the BEST time to start saving money?', options: ['After college', 'At age 30', 'Right now, any age', 'When you earn ₹1 lakh/month'], answer: 2, explanation: 'The earlier you start saving, the more time your money has to grow. Start now, even with small amounts.' },
            { question: 'The "3-Jar Rule" divides money into:', options: ['Spend, Borrow, Invest', 'Spend, Save, Give', 'Earn, Lose, Find', 'Gold, Silver, Bronze'], answer: 1, explanation: 'The 3-Jar Rule: keep jars for Spending (daily needs), Saving (future goals), and Giving (helping others).' },
            { question: 'If you save ₹10 every day, how much will you have in 1 year?', options: ['₹365', '₹1,000', '₹3,650', '₹100'], answer: 2, explanation: '₹10 × 365 days = ₹3,650! Small daily savings add up to big amounts over time.' }
        ]
    },
    {
        id: 'g5-m1-w2-fri', grade: 5, month: 1, week: 2, day: 'Fri', topic: 'The Piggy Bank Story', description: 'How a simple saving habit changed a child\'s life — a story about patience and goals.', youtubeId: 'FLkxItoIkLA', channel: 'ChuChu TV', durationMin: 8,
        assessment: [
            { question: 'What is a "savings goal"?', options: ['Something you want to buy immediately', 'A target amount you save towards over time', 'A loan from parents', 'Money spent on games'], answer: 1, explanation: 'A savings goal is a specific thing you\'re saving for — like a bicycle — with a target amount and date.' },
            { question: 'What happens if you spend ALL your money every day?', options: ['You become rich faster', 'You always have nothing saved for emergencies', 'Your parents get more money', 'Nothing changes'], answer: 1, explanation: 'Spending everything leaves you with nothing for emergencies or bigger goals. Save first, then spend.' },
            { question: 'Which is smarter: buying 10 small random things OR saving for 1 big meaningful thing?', options: ['10 small things, more fun', '1 big thing, more value', 'Both are equal', 'Neither'], answer: 1, explanation: 'Saving for a meaningful goal teaches patience and gives you something you\'ll truly value and remember.' }
        ]
    },
    // MARCH - WEEK 3
    {
        id: 'g5-m1-w3-mon', grade: 5, month: 1, week: 3, day: 'Mon', topic: 'Budget — Your Money Map', description: 'What a budget is and why even kids should make one every month.', youtubeId: 'qMqq6mUNCtU', channel: 'Priceconomics', durationMin: 6,
        assessment: [
            { question: 'What is a budget?', options: ['A fancy word for spending', 'A plan for how to use your money', 'A government tax', 'A type of bank account'], answer: 1, explanation: 'A budget is a plan that tells your money where to go — instead of wondering where it went!' },
            { question: 'The 50/30/20 rule means:', options: ['50% save, 30% invest, 20% spend', '50% needs, 30% wants, 20% savings', '50% food, 30% school, 20% play', '50% spend, 30% waste, 20% lose'], answer: 1, explanation: 'The 50/30/20 rule: spend 50% on needs, 30% on wants, and save 20%. A great starting point for any budget.' },
            { question: 'Why do budgets help?', options: ['They make you feel poor', 'They limit all fun', 'They help you reach goals faster', 'They replace banks'], answer: 2, explanation: 'Budgets help you see exactly where money goes, avoid waste, and reach your savings goals much faster.' }
        ]
    },
    {
        id: 'g5-m1-w3-wed', grade: 5, month: 1, week: 3, day: 'Wed', topic: 'UPI and Digital Payments', description: 'How UPI works and why India leads the world in digital payments.', youtubeId: 'tVGFmjCcWyw', channel: 'NPCI Official', durationMin: 7,
        assessment: [
            { question: 'What does UPI stand for?', options: ['Unified Payment Interface', 'Universal Personal Income', 'United Public Investment', 'Useful Payment Index'], answer: 0, explanation: 'UPI stands for Unified Payments Interface — it lets you send money instantly using just a phone number or QR code.' },
            { question: 'Which Indian organization runs the UPI system?', options: ['RBI', 'SEBI', 'NPCI', 'IT Department'], answer: 2, explanation: 'NPCI (National Payments Corporation of India) created and runs the UPI system.' },
            { question: 'India processes more UPI transactions than which country\'s entire card network?', options: ['Nepal', 'USA', 'Sri Lanka', 'Bangladesh'], answer: 1, explanation: 'India\'s UPI volume exceeded the US card network in 2023 — India leads the world in real-time digital payments!' }
        ]
    },
    {
        id: 'g5-m1-w3-fri', grade: 5, month: 1, week: 3, day: 'Fri', topic: 'Online Safety & Scam Awareness', description: 'How to identify fake calls, UPI scams, and "free money" tricks.', youtubeId: 'NkG9R7hDLpk', channel: 'RBI Kehta Hai', durationMin: 6,
        assessment: [
            { question: 'Someone calls and says "You won ₹10 lakh. Share your OTP to claim." What should you do?', options: ['Share OTP quickly', 'Call your bank first', 'NEVER share OTP to anyone — hang up', 'Ask for more details'], answer: 2, explanation: 'NEVER share your OTP with anyone. Banks and RBI never ask for OTPs. This is a classic scam.' },
            { question: 'What is "OTP" and why is it secret?', options: ['One Time Password — it verifies only you', 'Old Treasury Plan — banks use it', 'Online Transfer Protocol — public info', 'Optional Payment Token — share freely'], answer: 0, explanation: 'OTP is a One Time Password sent only to your phone. It proves you are the account owner. Never share it.' },
            { question: 'If a link says "Click here to win free iPhone", you should:', options: ['Click immediately', 'Share with friends first', 'Never click suspicious links', 'Enter your bank details to claim'], answer: 2, explanation: 'Never click suspicious links. They can steal your data or install viruses. "Free prize" = almost always a scam.' }
        ]
    },
    // MARCH - WEEK 4
    {
        id: 'g5-m1-w4-mon', grade: 5, month: 1, week: 4, day: 'Mon', topic: 'Banks — Your Money\'s Home', description: 'What banks do, how savings accounts work, and why keeping money in a bank is safer than at home.', youtubeId: 'mYPNFTXqDa4', channel: 'Investopedia', durationMin: 7,
        assessment: [
            { question: 'Why is a bank safer than keeping cash at home?', options: ['Banks pay you to store money', 'Cash at home earns interest', 'Banks protect deposits up to ₹5 lakh via DICGC', 'Banks never fail'], answer: 2, explanation: 'DICGC insures your bank deposits up to ₹5 lakh. If the bank fails, you still get your money back up to that limit.' },
            { question: 'What is "interest" on a savings account?', options: ['A penalty for saving', 'Extra money the bank pays you for keeping money there', 'A type of loan', 'Bank charges'], answer: 1, explanation: 'Banks pay you interest for keeping money with them — they use your money to give loans to others, and share some profit with you.' },
            { question: 'What is a passbook?', options: ['A password book', 'A record of all your bank transactions', 'An ATM card', 'A certificate of deposit'], answer: 1, explanation: 'A passbook records all money going in (deposits) and out (withdrawals) of your bank account.' }
        ]
    },
    {
        id: 'g5-m1-w4-wed', grade: 5, month: 1, week: 4, day: 'Wed', topic: 'Goals — Short, Medium, Long Term', description: 'How to set SMART financial goals for things you want next week, next year, or in 10 years.', youtubeId: 'XpKvs-apvOs', channel: 'Crash Course Kids', durationMin: 6,
        assessment: [
            { question: 'A SHORT-term financial goal takes:', options: ['10+ years', '5-10 years', '1-12 months', 'Forever'], answer: 2, explanation: 'Short-term goals are achievable within a year — like saving for a new book or phone case.' },
            { question: 'What does SMART stand for in goal-setting?', options: ['Small, Manageable, Achievable, Real, Timed', 'Specific, Measurable, Achievable, Relevant, Time-bound', 'Simple, Meaningful, Active, Realistic, Tested', 'Super, Magic, Amazing, Rich, True'], answer: 1, explanation: 'SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound. This makes goals actually reachable.' },
            { question: 'Which is a LONG-term financial goal for a Class 5 student?', options: ['Buying a snack today', 'Saving for a bicycle this month', 'Building savings for college', 'Getting ₹10 from parents'], answer: 2, explanation: 'College savings is a long-term goal (10+ years away). Planning for it early makes it much more achievable.' }
        ]
    },
    {
        id: 'g5-m1-w4-fri', grade: 5, month: 1, week: 4, day: 'Fri', topic: 'March Review: Money Basics Quiz', description: 'Review everything from March — money, savings, budgets, banks, and safety.', youtubeId: '6RRlhRHJNqY', channel: 'EconEdLink', durationMin: 10,
        assessment: [
            { question: 'The 3 functions of money are:', options: ['Earn, Spend, Lose', 'Exchange, Store, Account', 'Borrow, Lend, Return', 'Gold, Silver, Cash'], answer: 1, explanation: 'Money works as: Medium of Exchange (replace barter), Store of Value (keep for later), Unit of Account (measure prices).' },
            { question: 'Which is the correct savings habit?', options: ['Spend first, save what\'s left', 'Save first, spend what\'s left', 'Borrow first, save never', 'Invest everything, save nothing'], answer: 1, explanation: '"Pay yourself first" — always set aside savings BEFORE spending. Spend what\'s left, not save what\'s left.' },
            { question: 'Who controls money supply in India?', options: ['Prime Minister\'s Office', 'Reserve Bank of India', 'State Bank of India', 'Parliament'], answer: 1, explanation: 'The Reserve Bank of India (RBI) controls the money supply and monetary policy of the country.' }
        ]
    },
];

// ── CLASS 6 SCHEDULE ──────────────────────────────────────────
const grade6: VideoClass[] = [
    {
        id: 'g6-m1-w1-mon', grade: 6, month: 1, week: 1, day: 'Mon', topic: 'Supply and Demand', description: 'Why prices rise and fall — the engine behind every market in the world.', youtubeId: 'LwLh6ax0zTE', channel: 'Khan Academy', durationMin: 9,
        assessment: [
            { question: 'When demand increases and supply stays the same, prices:', options: ['Fall', 'Rise', 'Stay the same', 'Disappear'], answer: 1, explanation: 'More buyers chasing the same number of products → sellers can charge more. Price rises.' },
            { question: 'During exam season, why do stationary shops charge more for pens?', options: ['Pens cost more to make', 'Demand for pens increases', 'Supply increases', 'Government allows it'], answer: 1, explanation: 'Exam season = more students needing pens = higher demand. With same supply, prices rise.' },
            { question: 'What happens to the price of mangoes in summer (peak season)?', options: ['Rises because heat costs more', 'Falls because supply is high', 'Stays fixed by government', 'Doubles automatically'], answer: 1, explanation: 'In mango season, supply is very high. More mangoes available → prices drop. This is how supply affects price.' }
        ]
    },
    {
        id: 'g6-m1-w1-wed', grade: 6, month: 1, week: 1, day: 'Wed', topic: 'What is GDP?', description: 'How a country measures its economic output and why India\'s GDP matters for you.', youtubeId: 'OB0t0rS0tHg', channel: 'TED-Ed', durationMin: 8,
        assessment: [
            { question: 'GDP stands for:', options: ['Gross Domestic Product', 'Government Daily Payment', 'General Distribution Plan', 'Gross Dollar Price'], answer: 0, explanation: 'GDP = Gross Domestic Product. It measures the total value of all goods and services produced in a country in a year.' },
            { question: 'India\'s GDP rank among world economies is approximately:', options: ['1st', '5th', '20th', '50th'], answer: 1, explanation: 'India is the 5th largest economy in the world by GDP (as of 2024), and growing fast.' },
            { question: 'If GDP grows at 7%, what does that mean for most people?', options: ['Everyone\'s salary falls by 7%', 'The economy is producing more wealth overall', 'Prices fall 7%', 'Taxes increase 7%'], answer: 1, explanation: 'Higher GDP means more economic activity — more businesses, more jobs, and generally better living standards over time.' }
        ]
    },
    {
        id: 'g6-m1-w1-fri', grade: 6, month: 1, week: 1, day: 'Fri', topic: 'Inflation — The Invisible Price Thief', description: 'Why ₹100 in 2010 bought more than ₹100 today, and what this means for your savings.', youtubeId: 'F4pDRMfDcMo', channel: 'Pranjal Kamra', durationMin: 10,
        assessment: [
            { question: 'Inflation means:', options: ['Prices falling over time', 'Prices rising over time', 'Salary increasing', 'More goods being produced'], answer: 1, explanation: 'Inflation is the rate at which prices rise over time. When inflation is 6%, something that cost ₹100 now costs ₹106.' },
            { question: 'If inflation is 6% and your savings account gives 4%, your money is:', options: ['Growing in real value', 'Losing real value', 'Staying exactly the same', 'Doubling'], answer: 1, explanation: 'Real return = investment return − inflation = 4% − 6% = −2%. Your money\'s buying power is decreasing!' },
            { question: 'India\'s average inflation rate has been approximately:', options: ['0-1%', '5-7%', '15-20%', '50%'], answer: 1, explanation: 'India\'s average inflation has historically been 5-7%. This is why investments must beat inflation to create real wealth.' }
        ]
    },
    {
        id: 'g6-m1-w2-mon', grade: 6, month: 1, week: 2, day: 'Mon', topic: 'Compound Interest — The 8th Wonder', description: 'Einstein called it the 8th wonder. Learn the formula that can make any child rich.', youtubeId: 'SPHM6Kv2Hg8', channel: 'Rachana Ranade', durationMin: 11,
        assessment: [
            { question: 'The compound interest formula is:', options: ['A = P + R × T', 'A = P(1 + R/N)^(N×T)', 'A = P × R × T / 100', 'A = P - Interest'], answer: 1, explanation: 'A = P(1 + r/n)^(nt). Principal × (1 + rate/compounds per year) raised to power of (compounds × years).' },
            { question: 'If you invest ₹10,000 at 12% for 10 years with annual compounding, you get approx:', options: ['₹12,000', '₹22,000', '₹31,000', '₹1,00,000'], answer: 2, explanation: '₹10,000 × (1.12)^10 ≈ ₹31,058. The interest earns interest — that\'s the magic of compounding!' },
            { question: 'Which grows faster?', options: ['Simple interest', 'Compound interest', 'Both are equal', 'Depends on the bank'], answer: 1, explanation: 'Compound interest always grows faster because you earn interest on your interest, not just on the original amount.' }
        ]
    },
    {
        id: 'g6-m1-w2-wed', grade: 6, month: 1, week: 2, day: 'Wed', topic: 'How Banks Make Money', description: 'Banks take your savings and lend it out — understand the spread that makes banking profitable.', youtubeId: 'McSGhiWEXAI', channel: 'Plain Bagel', durationMin: 9,
        assessment: [
            { question: 'Banks make profit from the:', options: ['Government printing money', 'Difference between lending rate and savings rate', 'Fees on debit cards only', 'Exchange rate'], answer: 1, explanation: 'Banks pay you 3-4% on savings but charge borrowers 10-15% on loans. The difference (called "spread") is their profit.' },
            { question: 'An FD (Fixed Deposit) gives more interest than a savings account because:', options: ['It\'s riskier', 'Money is locked for a fixed period', 'RBI mandates higher rates', 'It\'s only for senior citizens'], answer: 1, explanation: 'You promise not to withdraw from an FD for a fixed period. Banks reward this commitment with higher interest rates.' },
            { question: 'If SBI savings rate is 3.5% and SBI loan rate is 9%, what is the spread?', options: ['5.5%', '3.5%', '9%', '12.5%'], answer: 0, explanation: 'Spread = Lending rate − Savings rate = 9% − 3.5% = 5.5%. This 5.5% is how the bank makes a profit.' }
        ]
    },
    {
        id: 'g6-m1-w2-fri', grade: 6, month: 1, week: 2, day: 'Fri', topic: 'Budget for a Month', description: 'Build a real monthly budget with income and expenses — hands-on example with pocket money.', youtubeId: 'koPIFpFdxFw', channel: 'Two Cents PBS', durationMin: 8,
        assessment: [
            { question: 'In a budget, "income" means:', options: ['Money you owe', 'Money you receive', 'Money you spend', 'Taxes paid'], answer: 1, explanation: 'Income = all money coming in: pocket money, gifts, earnings. You must know your income before budgeting spending.' },
            { question: 'Which spending category should come LAST in a budget?', options: ['Food', 'School supplies', 'Entertainment and fun', 'Transport'], answer: 2, explanation: 'Entertainment is a "want", not a "need". Allocate money for needs first, then see how much remains for wants.' },
            { question: 'If your pocket money is ₹500/month, how much should you save using the 20% rule?', options: ['₹10', '₹50', '₹100', '₹200'], answer: 2, explanation: '20% of ₹500 = ₹100. Save ₹100 every month, and in 1 year you\'ll have ₹1,200 — without much effort!' }
        ]
    },
];

// ── CLASS 7 SCHEDULE ──────────────────────────────────────────
const grade7: VideoClass[] = [
    {
        id: 'g7-m1-w1-mon', grade: 7, month: 1, week: 1, day: 'Mon', topic: 'Interest Rate Deep Dive', description: 'The difference between nominal and real interest rates and how to calculate the true return on your money.', youtubeId: 'Lp7E973zozc', channel: 'Khan Academy', durationMin: 10,
        assessment: [
            { question: 'Real interest rate equals:', options: ['Nominal rate + Inflation', 'Nominal rate − Inflation', 'Inflation − Nominal rate', 'Nominal rate × Inflation'], answer: 1, explanation: 'Real Rate = Nominal Rate − Inflation. If FD gives 7% but inflation is 5%, your real gain is only 2%.' },
            { question: 'If a bank offers 8% FD but inflation is 6%, the real return is:', options: ['14%', '8%', '6%', '2%'], answer: 3, explanation: 'Real return = 8% − 6% = 2%. Your money grows, but only 2% in actual buying power.' },
            { question: 'Why do investors look at real returns, not just nominal returns?', options: ['Banks require it', 'Nominal rates are illegal', 'Real returns show actual growth in buying power', 'RBI mandates real rate reporting'], answer: 2, explanation: 'Nominal return tells you the number. Real return tells you if you\'re actually getting richer in terms of what you can buy.' }
        ]
    },
    {
        id: 'g7-m1-w1-wed', grade: 7, month: 1, week: 1, day: 'Wed', topic: 'Rule of 72 — Fast Doubling Math', description: 'The fastest mental math trick in finance: how long will it take to double your money?', youtubeId: '3Q7oWBW6nVE', channel: 'Wealthsimple', durationMin: 7,
        assessment: [
            { question: 'Rule of 72 formula gives you:', options: ['Monthly interest', 'Years to double money', 'Rate needed for 72% growth', 'Annual tax savings'], answer: 1, explanation: 'Rule of 72: divide 72 by your annual return rate. The result = years to double your money.' },
            { question: 'At 12% return, how many years to double your investment?', options: ['12 years', '9 years', '6 years', '3 years'], answer: 2, explanation: '72 ÷ 12 = 6 years. At 12% per year, your money doubles in just 6 years through compound growth.' },
            { question: '₹10,000 invested at 9% will become ₹20,000 in approximately:', options: ['9 years', '8 years', '6 years', '4 years'], answer: 1, explanation: '72 ÷ 9 = 8 years. Rule of 72 gives you a quick mental estimate without a calculator.' }
        ]
    },
    {
        id: 'g7-m1-w1-fri', grade: 7, month: 1, week: 1, day: 'Fri', topic: 'Inflation\'s Real Impact on India', description: 'A data-driven look at how rising prices affect Indian families differently based on income.', youtubeId: 'ByiHoalT96U', channel: 'NDTV Profit', durationMin: 9,
        assessment: [
            { question: 'Which Indian index measures food price inflation?', options: ['Sensex', 'CPI (Consumer Price Index)', 'GDP Deflator', 'WPI Only'], answer: 1, explanation: 'CPI (Consumer Price Index) tracks the average price change for a basket of goods that typical families buy.' },
            { question: 'Rising onion prices hit which income group MOST?', options: ['Billionaires', 'Middle class', 'Lower income families', 'All equally'], answer: 2, explanation: 'Lower income families spend a larger share of income on food. When food prices rise, they feel the impact most severely.' },
            { question: 'India\'s RBI tries to keep inflation at:', options: ['0%', '2% ± 1%', '4% ± 2%', '10% ± 2%'], answer: 2, explanation: 'RBI\'s inflation target is 4%, with a tolerance band of ±2% (so between 2% and 6%). Above 6% triggers action.' }
        ]
    },
];

// ── CLASS 8 SCHEDULE ──────────────────────────────────────────
const grade8: VideoClass[] = [
    {
        id: 'g8-m1-w1-mon', grade: 8, month: 1, week: 1, day: 'Mon', topic: 'NSE & BSE — India\'s Stock Exchanges', description: 'How the National Stock Exchange and Bombay Stock Exchange work, and what a listed company is.', youtubeId: 'F_96yoQmWEE', channel: 'Rachana Ranade', durationMin: 12,
        assessment: [
            { question: 'BSE (Bombay Stock Exchange) was established in:', options: ['1947', '1875', '1991', '1932'], answer: 1, explanation: 'BSE is Asia\'s oldest stock exchange, established in 1875 as the "Native Share & Stock Brokers Association".' },
            { question: 'NIFTY 50 represents:', options: ['50 government bonds', '50 largest companies on NSE', 'Top 50 mutual funds', 'Government\'s 50 policies'], answer: 1, explanation: 'NIFTY 50 is an index of the 50 largest and most liquid companies listed on the National Stock Exchange of India.' },
            { question: 'If NIFTY falls 200 points, it means:', options: ['The government loses money', 'The average value of top 50 stocks decreased', 'Tax rates increased', 'Rupee value fell'], answer: 1, explanation: 'A NIFTY fall means the weighted average market cap of those 50 companies declined — investors\' portfolios lost value.' }
        ]
    },
    {
        id: 'g8-m1-w1-wed', grade: 8, month: 1, week: 1, day: 'Wed', topic: 'What is a Share?', description: 'Own a piece of a company. Understand equity, dividends, and how stock prices move.', youtubeId: 'sD1H700bFSU', channel: 'Zerodha Varsity', durationMin: 10,
        assessment: [
            { question: 'Buying 1 share of a company means:', options: ['Lending them money', 'Becoming a partial owner', 'Getting a fixed interest', 'Paying their bills'], answer: 1, explanation: 'A share represents ownership. If a company has 1,00,000 shares and you own 1, you own 1/1,00,000th of the company.' },
            { question: 'Dividends are paid to shareholders from:', options: ['Bank loans', 'Company profits', 'Government grants', 'Other shareholders'], answer: 1, explanation: 'Dividends are a portion of company profits distributed to shareholders. Not all companies pay dividends.' },
            { question: 'If you buy a share at ₹100 and sell at ₹150, your gain is:', options: ['₹50', '₹150', '₹100', '₹250'], answer: 0, explanation: 'Capital Gain = Sell Price − Buy Price = ₹150 − ₹100 = ₹50 per share. This is called Capital Appreciation.' }
        ]
    },
    {
        id: 'g8-m1-w1-fri', grade: 8, month: 1, week: 1, day: 'Fri', topic: 'Risk and Return Relationship', description: 'Higher risk = higher potential return. Understanding this is the foundation of all investing.', youtubeId: 'r-M3aGiJ3bU', channel: 'ET Money', durationMin: 9,
        assessment: [
            { question: 'Which typically has the HIGHEST risk AND highest potential return?', options: ['Savings account', 'Fixed Deposit', 'Direct stocks', 'Government bonds'], answer: 2, explanation: 'Direct stocks have highest risk (can go to zero) but also highest potential return (can multiply many times).' },
            { question: 'Risk tolerance means:', options: ['How much loss you can afford emotionally and financially', 'How fast you can run', 'How many stocks you own', 'Your credit score'], answer: 0, explanation: 'Risk tolerance is your ability and willingness to handle investment losses. It depends on age, income, and goals.' },
            { question: 'A "risk-free" investment in India is:', options: ['Real estate', 'Gold ETF', 'Government of India bonds', 'NSE stocks'], answer: 2, explanation: 'Government bonds (like G-Secs) are considered risk-free because the Indian government has never defaulted on rupee debt.' }
        ]
    },
];

// ── CLASS 9-12 abbreviated entries (Week 1 Mon only shown as seed) ──────────
const grade9: VideoClass[] = [
    {
        id: 'g9-m1-w1-mon', grade: 9, month: 1, week: 1, day: 'Mon', topic: 'Mutual Funds — Investing Made Simple', description: 'What a mutual fund is, how NAV works, and why SIPs are India\'s most powerful savings tool.', youtubeId: 'ngqFPMCvGH4', channel: 'ET Money', durationMin: 12,
        assessment: [
            { question: 'NAV stands for:', options: ['Net Asset Value', 'National Account Verification', 'Nominal Annual Value', 'Net Average Volume'], answer: 0, explanation: 'NAV = Net Asset Value. It\'s the per-unit price of a mutual fund, calculated daily based on the fund\'s holdings.' },
            { question: 'A SIP (Systematic Investment Plan) means:', options: ['Investing a lump sum once', 'Investing a fixed amount every month', 'Taking a loan from mutual funds', 'Selling units every month'], answer: 1, explanation: 'SIP = investing a fixed amount (e.g., ₹500/month) on a set date. It removes timing risk and builds discipline.' },
            { question: 'Rupee Cost Averaging means:', options: ['Averaging your expenses', 'Buying more units when prices are low and fewer when high', 'Converting rupees to dollars', 'Averaging bank interest rates'], answer: 1, explanation: 'With SIPs, the same ₹ amount buys more units when NAV is low and fewer when high — automatically averaging your cost.' }
        ]
    },
];

const grade10: VideoClass[] = [
    {
        id: 'g10-m1-w1-mon', grade: 10, month: 1, week: 1, day: 'Mon', topic: 'Income Tax Basics for Students', description: 'How India\'s income tax slab system works, and why understanding tax is a life skill.', youtubeId: '9zOHBZBMXrM', channel: 'Labour Law Advisor', durationMin: 14,
        assessment: [
            { question: 'The current income tax exemption limit in India (New Regime 2024) is:', options: ['₹2.5 lakh', '₹5 lakh', '₹7 lakh', '₹10 lakh'], answer: 2, explanation: 'Under the New Tax Regime (2024), income up to ₹7 lakh is effectively tax-free with the standard rebate.' },
            { question: 'Tax Deducted at Source (TDS) means:', options: ['Tax you pay at year end', 'Tax employer deducts from salary before paying', 'You send tax to government directly', 'A penalty for late filing'], answer: 1, explanation: 'TDS is tax deducted at the source of income — your employer sends it to the government before paying your salary.' },
            { question: 'Why should students know about income tax?', options: ['Only needed after retirement', 'Schools test on it', 'First salary decisions (investments, HRA, 80C) depend on it', 'It\'s mandatory by law at age 16'], answer: 2, explanation: 'Your first job salary decisions — choosing the right tax regime, knowing 80C deductions — save or cost you lakhs.' }
        ]
    },
];

const grade11: VideoClass[] = [
    {
        id: 'g11-m1-w1-mon', grade: 11, month: 1, week: 1, day: 'Mon', topic: 'Index Funds vs Active Funds', description: 'Why most actively managed funds underperform the index — and what Warren Buffett recommends for most investors.', youtubeId: 'fvGLnthJDsg', channel: 'Pranjal Kamra', durationMin: 13,
        assessment: [
            { question: 'An index fund tracks:', options: ['A fund manager\'s picks', 'A market index like NIFTY 50', 'The government bond rate', 'Gold prices'], answer: 1, explanation: 'Index funds passively replicate a market index (like NIFTY 50) by holding the same stocks in the same proportion.' },
            { question: 'Over 15 years, what % of actively managed large-cap funds beat the NIFTY 50 index?', options: ['80%', '50%', 'Less than 25%', '100%'], answer: 2, explanation: 'SEBI data shows that over 15 years, less than 25% of active large-cap funds beat the NIFTY 50 index. Most underperform.' },
            { question: 'The main advantage of index funds over active funds is:', options: ['Higher returns always', 'Lower expense ratios and guaranteed returns', 'More fund manager expertise', 'Only available to rich investors'], answer: 1, explanation: 'Index funds have much lower fees (expense ratio ~0.1% vs 1-2% for active funds) and most beat active funds over time.' }
        ]
    },
];

const grade12: VideoClass[] = [
    {
        id: 'g12-m1-w1-mon', grade: 12, month: 1, week: 1, day: 'Mon', topic: 'FIRE — Financial Independence, Retire Early', description: 'The mathematics of retiring in your 40s, and the Indian FIRE movement growing among millennials.', youtubeId: '8si9CnCsJpQ', channel: 'Ankur Warikoo', durationMin: 15,
        assessment: [
            { question: 'FIRE stands for:', options: ['Fast Income, Rapid Exit', 'Financial Independence, Retire Early', 'Fixed Income, Real Estate', 'Finance, Investment, Returns, Equity'], answer: 1, explanation: 'FIRE = Financial Independence, Retire Early. Build enough wealth to live off investment returns without needing a job.' },
            { question: 'The "25x Rule" for FIRE means:', options: ['Save 25% of income', 'You need 25x your annual expenses invested', 'Retire at 25', 'Earn 25 times your age'], answer: 1, explanation: 'To retire, you need ~25× your annual expenses invested. At 4% withdrawal, this sustains you indefinitely (The 4% Rule).' },
            { question: 'If your annual expenses are ₹6 lakh, your FIRE number is:', options: ['₹6 lakh', '₹60 lakh', '₹1.5 crore', '₹6 crore'], answer: 2, explanation: 'FIRE number = 25 × annual expenses = 25 × ₹6 lakh = ₹1.5 crore. Invest this and withdraw 4% (₹6L) annually.' }
        ]
    },
];

// ────────────────────────────────────────────────────────────
// Helper: generate filler weeks for a grade using topic rotation
// ────────────────────────────────────────────────────────────
function makeFillerSessions(
    gradeNum: number,
    existingIds: Set<string>,
    topics: { mon: string; wed: string; fri: string; youtubeId: string; channel: string }[]
): VideoClass[] {
    const sessions: VideoClass[] = [];
    let topicIdx = 0;
    for (let m = 1; m <= 10; m++) {
        for (let w = 1; w <= 4; w++) {
            const days: ('Mon' | 'Wed' | 'Fri')[] = ['Mon', 'Wed', 'Fri'];
            const t = topics[topicIdx % topics.length];
            for (const d of days) {
                const id = `g${gradeNum}-m${m}-w${w}-${d.toLowerCase()}`;
                if (!existingIds.has(id)) {
                    sessions.push({
                        id, grade: gradeNum, month: m, week: w, day: d as 'Mon' | 'Wed' | 'Fri',
                        topic: d === 'Mon' ? t.mon : d === 'Wed' ? t.wed : t.fri,
                        description: `Week ${w} of ${MONTHS[m - 1]}: ${d === 'Mon' ? t.mon : d === 'Wed' ? t.wed : t.fri}`,
                        youtubeId: t.youtubeId,
                        channel: t.channel,
                        durationMin: 10,
                        assessment: [
                            { question: 'What was the main concept covered in this video?', options: ['Saving money', 'Compound interest', 'The topic discussed in the video', 'Inflation rates'], answer: 2, explanation: 'Always identify the main concept — it helps you retain and apply the knowledge.' },
                            { question: 'Which habit does this topic encourage?', options: ['Spending more', 'Ignoring finances', 'Making informed money decisions', 'Avoiding banks'], answer: 2, explanation: 'Every financial lesson encourages you to make more informed, intentional decisions with money.' },
                            { question: 'How can you apply this learning in real life this week?', options: ['Forget it after the test', 'Share with a parent or friend and discuss', 'Only use it after age 18', 'Wait for the teacher to tell you'], answer: 1, explanation: 'The best way to retain financial knowledge is to discuss and apply it immediately. Share a learning with someone today.' }
                        ] as [VideoAssessment, VideoAssessment, VideoAssessment]
                    });
                }
            }
            topicIdx++;
        }
    }
    return sessions;
}

function buildFullGrade(gradeNum: number, seed: VideoClass[]): VideoClass[] {
    const existingIds = new Set(seed.map(s => s.id));
    const topicRotation = [
        { mon: 'Earning Money', wed: 'Saving Strategies', fri: 'Spending Wisely', youtubeId: 'yoS9_kcuBQc', channel: 'Khan Academy' },
        { mon: 'Understanding Banks', wed: 'Loans and Debt', fri: 'Insurance Basics', youtubeId: 'McSGhiWEXAI', channel: 'Two Cents PBS' },
        { mon: 'Investing Basics', wed: 'Stock Market Intro', fri: 'Mutual Fund Concepts', youtubeId: 'ngqFPMCvGH4', channel: 'ET Money' },
        { mon: 'Tax Awareness', wed: 'GST Explained', fri: 'Government Schemes', youtubeId: '9zOHBZBMXrM', channel: 'Labour Law Advisor' },
        { mon: 'Entrepreneurship', wed: 'Side Income Ideas', fri: 'Digital Earning Methods', youtubeId: '5XsGvbASlXo', channel: 'Ankur Warikoo' },
        { mon: 'Budgeting Deep Dive', wed: 'Emergency Fund', fri: 'Financial Planning', youtubeId: 'koPIFpFdxFw', channel: 'Two Cents PBS' },
        { mon: 'Credit Score', wed: 'Loan Types', fri: 'EMI Calculations', youtubeId: 'r-M3aGiJ3bU', channel: 'ET Money' },
        { mon: 'Gold as Investment', wed: 'Real Estate Basics', fri: 'Asset Allocation', youtubeId: 'fvGLnthJDsg', channel: 'Pranjal Kamra' },
        { mon: 'Crypto Awareness', wed: 'Scam Detection', fri: 'Digital Safety', youtubeId: 'NkG9R7hDLpk', channel: 'RBI Kehta Hai' },
        { mon: 'FIRE Principles', wed: 'Retirement Planning', fri: 'Legacy and Giving', youtubeId: '8si9CnCsJpQ', channel: 'Ankur Warikoo' },
    ];
    return [...seed, ...makeFillerSessions(gradeNum, existingIds, topicRotation)];
}

// ── EXPORT: Full schedule map ──────────────────────────────────
export const videoSchedule: Record<number, VideoClass[]> = {
    5: buildFullGrade(5, grade5),
    6: buildFullGrade(6, grade6),
    7: buildFullGrade(7, grade7),
    8: buildFullGrade(8, grade8),
    9: buildFullGrade(9, grade9),
    10: buildFullGrade(10, grade10),
    11: buildFullGrade(11, grade11),
    12: buildFullGrade(12, grade12),
};

export function getClassById(id: string): VideoClass | undefined {
    for (const sessions of Object.values(videoSchedule)) {
        const found = sessions.find(s => s.id === id);
        if (found) return found;
    }
    return undefined;
}

export function getWeekSessions(grade: number, month: number, week: number): VideoClass[] {
    return (videoSchedule[grade] || []).filter(s => s.month === month && s.week === week);
}
