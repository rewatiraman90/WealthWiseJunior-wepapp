export interface VideoAssessment {
    question: string;
    options: [string, string, string, string];
    answer: number; // 0-3
    explanation: string;
}

export interface VideoClass {
    id: string; // e.g. "g5-m1-w1-mon"
    grade: number;
    month: number; // 1=Module 1 ... 10=Module 10
    week: number;  // 1-4
    day: 'Mon' | 'Wed' | 'Fri';
    topic: string;
    description: string;
    youtubeId: string;
    channel: string;
    durationMin: number;
    assessment: [VideoAssessment, VideoAssessment, VideoAssessment];
}

export const MONTHS = ['Module 1', 'Module 2', 'Module 3', 'Module 4', 'Module 5', 'Module 6', 'Module 7', 'Module 8', 'Module 9', 'Module 10'];

export function getWeekDate(month: number, week: number, day: 'Mon' | 'Wed' | 'Fri'): Date {
    const year = 2026;
    const monthIndex = month + 1;
    const d = new Date(year, monthIndex, 1);
    const firstMonday = new Date(d);
    const dow = d.getDay();
    const diff = dow === 0 ? 1 : dow === 1 ? 0 : 8 - dow;
    firstMonday.setDate(1 + diff);
    const baseDate = new Date(firstMonday);
    baseDate.setDate(baseDate.getDate() + (week - 1) * 7);
    const dayOffset = { Mon: 0, Wed: 2, Fri: 4 };
    baseDate.setDate(baseDate.getDate() + dayOffset[day]);
    return baseDate;
}

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

// ── LEVEL 1 — Explorer (Grade 5) ─────────────────────────────
const grade5: VideoClass[] = [
    // MODULE 1 — Money Foundations
    {
        id: 'g5-m1-w1-mon', grade: 5, month: 1, week: 1, day: 'Mon',
        topic: 'What Is Money?', description: 'Why humans invented money and how it replaced the barter system — told in a fun, visual way.',
        youtubeId: 'GZ7y-yFdX9M', channel: 'Peekaboo Kidz', durationMin: 5,
        assessment: [
            { question: 'What did people use before money was invented?', options: ['Gold coins', 'Barter system', 'Paper notes', 'Credit cards'], answer: 1, explanation: 'Before money, people exchanged goods directly — this was called the barter system.' },
            { question: 'Which is NOT a function of money?', options: ['Medium of exchange', 'Store of value', 'Growing crops', 'Unit of account'], answer: 2, explanation: 'Money has 3 main functions: medium of exchange, store of value, and unit of account. Growing crops is not one.' },
            { question: 'Why was barter inconvenient?', options: ['It was illegal', 'It required double coincidence of wants', 'It used too much gold', 'Banks refused it'], answer: 1, explanation: 'Barter needed both parties to want exactly what the other had — called "double coincidence of wants".' }
        ]
    },
    {
        id: 'g5-m1-w1-wed', grade: 5, month: 1, week: 1, day: 'Wed',
        topic: 'How Banks Work', description: 'What banks do with your money, why they exist, and how a savings account gives you interest.',
        youtubeId: 'E-HOz8T6tAo', channel: 'Khan Academy', durationMin: 10,
        assessment: [
            { question: 'Why is a bank safer than keeping cash at home?', options: ['Banks pay you to store money', 'Banks protect deposits up to ₹5 lakh via DICGC', 'Cash earns interest at home', 'Banks never fail'], answer: 1, explanation: 'DICGC insures your bank deposits up to ₹5 lakh. If the bank fails, you still get your money back.' },
            { question: 'What is "interest" on a savings account?', options: ['A penalty for saving', 'Extra money the bank pays you for keeping money there', 'A type of loan', 'Bank charges'], answer: 1, explanation: 'Banks pay you interest for keeping money with them — they lend it out and share a portion of the profit with you.' },
            { question: 'What does a bank do with your savings?', options: ['Burns it for safety', 'Sends it to the government', 'Lends it to other customers and businesses', 'Keeps it locked in a vault'], answer: 2, explanation: 'Banks use deposited money to give loans, and use the interest earned on those loans to pay you and run operations.' }
        ]
    },
    {
        id: 'g5-m1-w1-fri', grade: 5, month: 1, week: 1, day: 'Fri',
        topic: 'Needs vs Wants', description: 'The difference between things you cannot survive without (needs) and things that are nice to have (wants).',
        youtubeId: 'IlFOepd4pTE', channel: 'Kids Academy', durationMin: 4,
        assessment: [
            { question: 'Which of these is a NEED?', options: ['New video game', 'Movie ticket', 'Food and water', 'Fancy shoes'], answer: 2, explanation: 'Food and water are needs — things you cannot survive without. The others are wants.' },
            { question: 'You have ₹500. Rice costs ₹200. A toy costs ₹400. What should you buy first?', options: ['The toy', 'Both together', 'The rice', 'Neither'], answer: 2, explanation: 'Always meet your needs first. Rice (food) is a need. The toy is a want.' },
            { question: 'Why is it important to know needs vs wants?', options: ['To impress friends', 'To spend all money fast', 'To make better money decisions', 'To avoid saving'], answer: 2, explanation: 'Knowing needs vs wants helps you prioritize spending and avoid wasting money on things that are not important.' }
        ]
    },
    {
        id: 'g5-m1-w2-mon', grade: 5, month: 1, week: 2, day: 'Mon',
        topic: 'Indian Currency — The Rupee', description: 'How Indian Rupee notes and coins are made, and what the ₹ symbol means for our nation.',
        youtubeId: 'gqOHGL5-kao', channel: 'Mocomi Kids', durationMin: 4,
        assessment: [
            { question: 'Who prints currency notes in India?', options: ['State Bank of India', 'Income Tax Department', 'Reserve Bank of India', 'Finance Ministry'], answer: 2, explanation: 'The Reserve Bank of India (RBI) is responsible for issuing and regulating currency in India.' },
            { question: 'What is the symbol ₹ called?', options: ['Rupee sign', 'Indian Franc', 'Desi Dollar', 'Lakh mark'], answer: 0, explanation: '₹ is the official currency symbol for the Indian Rupee, designed by D. Udaya Kumar in 2010.' },
            { question: 'Who controls the money supply in India?', options: ['Prime Minister', 'RBI Governor', 'Stock Market', 'World Bank'], answer: 1, explanation: 'The RBI Governor oversees monetary policy and controls how much money is in circulation.' }
        ]
    },
    {
        id: 'g5-m1-w2-wed', grade: 5, month: 1, week: 2, day: 'Wed',
        topic: 'Saving — Your First Superpower', description: 'Why saving even small amounts every day creates a big habit that can make you financially free.',
        youtubeId: 'B3njsO5ewA8', channel: 'Learning Junction', durationMin: 5,
        assessment: [
            { question: 'What is the BEST time to start saving money?', options: ['After college', 'At age 30', 'Right now, any age', 'When you earn ₹1 lakh/month'], answer: 2, explanation: 'The earlier you start saving, the more time your money has to grow. Start now, even with small amounts.' },
            { question: 'The "3-Jar Rule" divides money into:', options: ['Spend, Borrow, Invest', 'Spend, Save, Give', 'Earn, Lose, Find', 'Gold, Silver, Bronze'], answer: 1, explanation: 'The 3-Jar Rule: keep jars for Spending (daily needs), Saving (future goals), and Giving (helping others).' },
            { question: 'If you save ₹10 every day, how much in 1 year?', options: ['₹365', '₹1,000', '₹3,650', '₹100'], answer: 2, explanation: '₹10 × 365 days = ₹3,650! Small daily savings add up to big amounts over time.' }
        ]
    },
    {
        id: 'g5-m1-w2-fri', grade: 5, month: 1, week: 2, day: 'Fri',
        topic: 'Compound Interest — Money Growing Money', description: 'The magical formula where your interest earns interest — and why starting early matters so much.',
        youtubeId: 'Rm6UdfRs3gw', channel: 'Khan Academy', durationMin: 9,
        assessment: [
            { question: 'What is compound interest?', options: ['Interest paid only on the original amount', 'Interest earned on both principal and previous interest', 'A bank fee', 'Interest paid to the government'], answer: 1, explanation: 'Compound interest earns interest on your interest — this is what makes money grow exponentially over time.' },
            { question: 'If you invest ₹1,000 at 10% for 3 years, with compound interest you get approx:', options: ['₹1,300', '₹1,331', '₹1,100', '₹3,000'], answer: 1, explanation: '₹1,000 × (1.10)^3 = ₹1,331. Simple interest would only give ₹1,300. Compounding gives ₹31 more!' },
            { question: 'Why is starting early so important for compound interest?', options: ['Banks prefer younger customers', 'More time means more compounding cycles = much more money', 'Government gives bonus to young investors', 'It is not important'], answer: 1, explanation: 'Each year of compounding multiplies your wealth. Starting at 15 vs 25 can mean 2-3× more money by retirement.' }
        ]
    },
    {
        id: 'g5-m1-w3-mon', grade: 5, month: 1, week: 3, day: 'Mon',
        topic: 'Budget — Your Money Map', description: 'What a budget is and why even kids should plan how they spend their pocket money each month.',
        youtubeId: '2yWDKDm-ZD8', channel: 'Two Cents PBS', durationMin: 8,
        assessment: [
            { question: 'What is a budget?', options: ['A fancy word for spending', 'A plan for how to use your money', 'A government tax', 'A type of bank account'], answer: 1, explanation: 'A budget is a plan that tells your money where to go — instead of wondering where it went!' },
            { question: 'The 50/30/20 rule means:', options: ['50% save, 30% invest, 20% spend', '50% needs, 30% wants, 20% savings', '50% food, 30% school, 20% play', '50% spend, 30% waste, 20% lose'], answer: 1, explanation: 'The 50/30/20 rule: spend 50% on needs, 30% on wants, and save 20%.' },
            { question: 'Why do budgets help?', options: ['They make you feel poor', 'They limit all fun', 'They help you reach goals faster', 'They replace banks'], answer: 2, explanation: 'Budgets help you see exactly where money goes, avoid waste, and reach your savings goals much faster.' }
        ]
    },
    {
        id: 'g5-m1-w3-wed', grade: 5, month: 1, week: 3, day: 'Wed',
        topic: 'UPI and Digital Payments', description: 'How UPI works and why India leads the world in digital payments — explained simply for young learners.',
        youtubeId: 'dOcq91qxQb4', channel: 'CNBC-TV18', durationMin: 5,
        assessment: [
            { question: 'What does UPI stand for?', options: ['Unified Payment Interface', 'Universal Personal Income', 'United Public Investment', 'Useful Payment Index'], answer: 0, explanation: 'UPI stands for Unified Payments Interface — it lets you send money instantly using just a phone number or QR code.' },
            { question: 'Which Indian organization runs the UPI system?', options: ['RBI', 'SEBI', 'NPCI', 'IT Department'], answer: 2, explanation: 'NPCI (National Payments Corporation of India) created and runs the UPI system.' },
            { question: 'What do you need to send money via UPI?', options: ['A cheque book', 'The other person\'s UPI ID or phone number', 'A bank branch visit', 'A credit card'], answer: 1, explanation: 'UPI only needs the recipient\'s UPI ID or phone number. Instant, free, 24/7 money transfer.' }
        ]
    },
    {
        id: 'g5-m1-w3-fri', grade: 5, month: 1, week: 3, day: 'Fri',
        topic: 'Online Safety & Scam Awareness', description: 'How to identify fake calls, UPI scams, and "free money" tricks — protect yourself online.',
        youtubeId: 'R12_y2BhKbE', channel: 'Google for Education', durationMin: 5,
        assessment: [
            { question: 'Someone calls and says "You won ₹10 lakh. Share your OTP." What should you do?', options: ['Share OTP quickly', 'Call your bank first', 'NEVER share OTP to anyone — hang up', 'Ask for more details'], answer: 2, explanation: 'NEVER share your OTP with anyone. Banks and RBI never ask for OTPs. This is a classic scam.' },
            { question: 'What is "OTP" and why is it secret?', options: ['One Time Password — it verifies only you', 'Old Treasury Plan', 'Online Transfer Protocol', 'Optional Payment Token'], answer: 0, explanation: 'OTP is a One Time Password sent only to your phone. It proves you are the account owner. Never share it.' },
            { question: 'If a link says "Click here to win free iPhone", you should:', options: ['Click immediately', 'Share with friends first', 'Never click suspicious links', 'Enter your bank details'], answer: 2, explanation: 'Never click suspicious links. "Free prize" = almost always a scam designed to steal your information.' }
        ]
    },
    {
        id: 'g5-m1-w4-mon', grade: 5, month: 1, week: 4, day: 'Mon',
        topic: 'Banking Institutions Explained', description: 'The different types of banks in India and how they serve different needs — from RBI to cooperative banks.',
        youtubeId: 'HGWRLRgOm8E', channel: 'Khan Academy', durationMin: 8,
        assessment: [
            { question: 'What is the RBI\'s main role?', options: ['Lend money to individuals', 'Run the government', 'Control monetary policy and currency', 'Collect income taxes'], answer: 2, explanation: 'RBI is India\'s central bank — it controls the money supply, sets interest rates, and supervises all other banks.' },
            { question: 'What is a "nationalized bank"?', options: ['A bank that is foreign-owned', 'A bank owned by the government', 'A bank only for farmers', 'An online-only bank'], answer: 1, explanation: 'Nationalized banks (like SBI, PNB) are government-owned. They are very safe because backed by the Indian government.' },
            { question: 'What is a passbook?', options: ['A password book', 'A record of all your bank transactions', 'An ATM card', 'A type of loan'], answer: 1, explanation: 'A passbook records all money going in (deposits) and out (withdrawals) of your bank account.' }
        ]
    },
    {
        id: 'g5-m1-w4-wed', grade: 5, month: 1, week: 4, day: 'Wed',
        topic: 'Goals — Short, Medium, Long Term', description: 'How to set SMART financial goals for things you want next week, next year, or in 10 years.',
        youtubeId: 'CZehGcN4Stg', channel: 'Khan Academy', durationMin: 6,
        assessment: [
            { question: 'A SHORT-term financial goal takes:', options: ['10+ years', '5-10 years', '1-12 months', 'Forever'], answer: 2, explanation: 'Short-term goals are achievable within a year — like saving for a new book or school supplies.' },
            { question: 'What does SMART stand for in goal-setting?', options: ['Small, Manageable, Achievable, Real, Timed', 'Specific, Measurable, Achievable, Relevant, Time-bound', 'Simple, Meaningful, Active, Realistic, Tested', 'Super, Magic, Amazing, Rich, True'], answer: 1, explanation: 'SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound. This makes goals actually reachable.' },
            { question: 'Which is a LONG-term financial goal for a Level 1 student?', options: ['Buying a snack today', 'Saving for a bicycle this month', 'Building savings for college education', 'Getting ₹10 from parents'], answer: 2, explanation: 'College savings is a long-term goal (10+ years away). Planning early makes it much more achievable.' }
        ]
    },
    {
        id: 'g5-m1-w4-fri', grade: 5, month: 1, week: 4, day: 'Fri',
        topic: 'Module 1 Review — Money Basics Mastery', description: 'Review everything from Module 1 — money history, savings, budgets, banking, and safety.',
        youtubeId: 'IlFOepd4pTE', channel: 'Kids Academy', durationMin: 4,
        assessment: [
            { question: 'The 3 functions of money are:', options: ['Earn, Spend, Lose', 'Exchange, Store, Account', 'Borrow, Lend, Return', 'Gold, Silver, Cash'], answer: 1, explanation: 'Money works as: Medium of Exchange (replace barter), Store of Value (keep for later), Unit of Account (measure prices).' },
            { question: 'Which is the correct savings habit?', options: ['Spend first, save what\'s left', 'Save first, spend what\'s left', 'Borrow first, save never', 'Invest everything'], answer: 1, explanation: '"Pay yourself first" — always set aside savings BEFORE spending. Spend what\'s left, not save what\'s left.' },
            { question: 'What should you NEVER share with anyone?', options: ['Your name', 'Your school name', 'Your OTP or bank PIN', 'Your city'], answer: 2, explanation: 'Never share your OTP or bank PIN — not even with someone claiming to be from your bank or the government.' }
        ]
    },
];

// ── LEVEL 2 — Saver (Grade 6) ─────────────────────────────────
const grade6: VideoClass[] = [
    {
        id: 'g6-m1-w1-mon', grade: 6, month: 1, week: 1, day: 'Mon',
        topic: 'Supply and Demand', description: 'Why prices rise and fall — the engine behind every market. Crash Course Economics explains it clearly.',
        youtubeId: 'g9aDizJpd_s', channel: 'Crash Course', durationMin: 10,
        assessment: [
            { question: 'When demand increases and supply stays the same, prices:', options: ['Fall', 'Rise', 'Stay the same', 'Disappear'], answer: 1, explanation: 'More buyers chasing the same number of products → sellers can charge more. Price rises.' },
            { question: 'During exam season, why do stationery shops charge more for pens?', options: ['Pens cost more to make', 'Demand for pens increases', 'Supply increases', 'Government allows it'], answer: 1, explanation: 'Exam season = more students needing pens = higher demand. With same supply, prices rise.' },
            { question: 'What happens to the price of mangoes in peak mango season?', options: ['Rises because heat costs more', 'Falls because supply is high', 'Stays fixed by government', 'Doubles automatically'], answer: 1, explanation: 'In mango season, supply is very high. More mangoes available → prices drop.' }
        ]
    },
    {
        id: 'g6-m1-w1-wed', grade: 6, month: 1, week: 1, day: 'Wed',
        topic: 'What is GDP?', description: 'How countries measure their economic output — and why India\'s growing GDP matters for your future.',
        youtubeId: 'zh8XASZxo1Q', channel: 'Khan Academy', durationMin: 8,
        assessment: [
            { question: 'GDP stands for:', options: ['Gross Domestic Product', 'Government Daily Payment', 'General Distribution Plan', 'Gross Dollar Price'], answer: 0, explanation: 'GDP = Gross Domestic Product. It measures the total value of all goods and services produced in a country in a year.' },
            { question: 'India\'s GDP rank among world economies is approximately:', options: ['1st', '5th', '20th', '50th'], answer: 1, explanation: 'India is the 5th largest economy in the world by GDP (as of 2024), and growing fast.' },
            { question: 'If GDP grows at 7%, what does that mean?', options: ['Everyone\'s salary falls by 7%', 'The economy is producing more wealth overall', 'Prices fall 7%', 'Taxes increase 7%'], answer: 1, explanation: 'Higher GDP means more economic activity — more businesses, more jobs, and generally better living standards.' }
        ]
    },
    {
        id: 'g6-m1-w1-fri', grade: 6, month: 1, week: 1, day: 'Fri',
        topic: 'Inflation — The Invisible Price Thief', description: 'Why ₹100 in 2010 bought more than ₹100 today, and what this means for your savings.',
        youtubeId: 'yahEP620480', channel: 'Khan Academy', durationMin: 8,
        assessment: [
            { question: 'Inflation means:', options: ['Prices falling over time', 'Prices rising over time', 'Salary increasing', 'More goods being produced'], answer: 1, explanation: 'Inflation is the rate at which prices rise over time. When inflation is 6%, something that cost ₹100 now costs ₹106.' },
            { question: 'If inflation is 6% and your savings account gives 4%, your money is:', options: ['Growing in real value', 'Losing real value', 'Staying exactly the same', 'Doubling'], answer: 1, explanation: 'Real return = investment return − inflation = 4% − 6% = −2%. Your money\'s buying power is decreasing!' },
            { question: 'India\'s average inflation rate has been approximately:', options: ['0-1%', '5-7%', '15-20%', '50%'], answer: 1, explanation: 'India\'s average inflation has historically been 5-7%. Investments must beat inflation to create real wealth.' }
        ]
    },
    {
        id: 'g6-m1-w2-mon', grade: 6, month: 1, week: 2, day: 'Mon',
        topic: 'Compound Interest — India Class 8 Level', description: 'Deep dive into the compound interest formula with Indian examples, as taught in CBSE Class 8 Math.',
        youtubeId: 'inayVc1w72M', channel: 'Khan Academy', durationMin: 10,
        assessment: [
            { question: 'The compound interest formula is:', options: ['A = P + R × T', 'A = P(1 + R/100)^T', 'A = P × R × T / 100', 'A = P - Interest'], answer: 1, explanation: 'A = P(1 + R/100)^T. You raise the bracket to the power of T (number of years) — this creates exponential growth.' },
            { question: 'If you invest ₹10,000 at 12% for 10 years with annual compounding, you get approx:', options: ['₹12,000', '₹22,000', '₹31,000', '₹1,00,000'], answer: 2, explanation: '₹10,000 × (1.12)^10 ≈ ₹31,058. The interest earns interest — that\'s the magic of compounding!' },
            { question: 'Which grows faster?', options: ['Simple interest', 'Compound interest', 'Both are equal', 'Depends on the bank'], answer: 1, explanation: 'Compound interest always grows faster because you earn interest on your interest, not just the original amount.' }
        ]
    },
    {
        id: 'g6-m1-w2-wed', grade: 6, month: 1, week: 2, day: 'Wed',
        topic: 'How Banks Make Money', description: 'Banks take your savings and lend it out — understand the spread that makes banking profitable.',
        youtubeId: 'HGWRLRgOm8E', channel: 'Khan Academy', durationMin: 8,
        assessment: [
            { question: 'Banks make profit from the:', options: ['Government printing money', 'Difference between lending rate and savings rate', 'Fees on debit cards only', 'Exchange rate'], answer: 1, explanation: 'Banks pay you 3-4% on savings but charge borrowers 10-15% on loans. The difference (called "spread") is their profit.' },
            { question: 'An FD (Fixed Deposit) gives more interest than a savings account because:', options: ['It\'s riskier', 'Money is locked for a fixed period', 'RBI mandates higher rates', 'It\'s only for senior citizens'], answer: 1, explanation: 'You promise not to withdraw from an FD for a fixed period. Banks reward this commitment with higher interest rates.' },
            { question: 'If SBI savings rate is 3.5% and SBI loan rate is 9%, what is the spread?', options: ['5.5%', '3.5%', '9%', '12.5%'], answer: 0, explanation: 'Spread = Lending rate − Savings rate = 9% − 3.5% = 5.5%. This 5.5% is how the bank makes a profit.' }
        ]
    },
    {
        id: 'g6-m1-w2-fri', grade: 6, month: 1, week: 2, day: 'Fri',
        topic: 'Why You Need an Emergency Fund', description: 'Life is unpredictable. Learn why saving 3-6 months of expenses as an emergency fund is essential.',
        youtubeId: 'vftjBTjFlzI', channel: 'Two Cents PBS', durationMin: 7,
        assessment: [
            { question: 'An emergency fund should cover how many months of expenses?', options: ['1 month', '3-6 months', '10 years', '1 week'], answer: 1, explanation: 'Financial experts recommend keeping 3-6 months of expenses as an emergency fund for unexpected events.' },
            { question: 'Where should you keep your emergency fund?', options: ['Invested in stocks', 'In a liquid savings account', 'In cash under your mattress', 'In fixed deposits only'], answer: 1, explanation: 'Emergency funds must be easily accessible (liquid). A savings account is best — not stocks that can lose value.' },
            { question: 'An emergency fund is MOST useful for:', options: ['Buying luxury items', 'Unexpected medical bills or job loss', 'Investing in crypto', 'Buying a car'], answer: 1, explanation: 'Emergencies like hospital bills, car breakdowns, or sudden unemployment are exactly what this fund is built for.' }
        ]
    },
];

// ── LEVEL 3 — Planner (Grade 7) ──────────────────────────────
const grade7: VideoClass[] = [
    {
        id: 'g7-m1-w1-mon', grade: 7, month: 1, week: 1, day: 'Mon',
        topic: 'Real vs Nominal Interest Rate', description: 'The difference between nominal (stated) and real (inflation-adjusted) interest rates — the number that actually matters.',
        youtubeId: 'yiE7QgcJwwQ', channel: 'Khan Academy', durationMin: 7,
        assessment: [
            { question: 'Real interest rate equals:', options: ['Nominal rate + Inflation', 'Nominal rate − Inflation', 'Inflation − Nominal rate', 'Nominal rate × Inflation'], answer: 1, explanation: 'Real Rate = Nominal Rate − Inflation. If FD gives 7% but inflation is 5%, your real gain is only 2%.' },
            { question: 'If a bank offers 8% FD but inflation is 6%, the real return is:', options: ['14%', '8%', '6%', '2%'], answer: 3, explanation: 'Real return = 8% − 6% = 2%. Your money grows, but only 2% in actual buying power.' },
            { question: 'Why do investors look at real returns?', options: ['Banks require it', 'Nominal rates are illegal', 'Real returns show actual growth in buying power', 'RBI mandates real rate reporting'], answer: 2, explanation: 'Nominal return tells you the number. Real return tells you if you\'re actually getting richer in terms of what you can buy.' }
        ]
    },
    {
        id: 'g7-m1-w1-wed', grade: 7, month: 1, week: 1, day: 'Wed',
        topic: 'Rule of 72 — Mental Math for Investors', description: 'The fastest mental math trick in finance: divide 72 by your return rate to find how long to double your money.',
        youtubeId: 'mec-QpjQMXY', channel: 'Khan Academy', durationMin: 5,
        assessment: [
            { question: 'Rule of 72 formula gives you:', options: ['Monthly interest', 'Years to double money', 'Rate needed for 72% growth', 'Annual tax savings'], answer: 1, explanation: 'Rule of 72: divide 72 by your annual return rate. The result = years to double your money.' },
            { question: 'At 12% return, how many years to double your investment?', options: ['12 years', '9 years', '6 years', '3 years'], answer: 2, explanation: '72 ÷ 12 = 6 years. At 12% per year, your money doubles in just 6 years through compound growth.' },
            { question: '₹10,000 invested at 9% will become ₹20,000 in approximately:', options: ['9 years', '8 years', '6 years', '4 years'], answer: 1, explanation: '72 ÷ 9 = 8 years. Rule of 72 gives you a quick mental estimate without a calculator.' }
        ]
    },
    {
        id: 'g7-m1-w1-fri', grade: 7, month: 1, week: 1, day: 'Fri',
        topic: 'Inflation\'s Real Impact — CPI in India', description: 'How India measures inflation using the Consumer Price Index, and why rising food prices hurt low-income families most.',
        youtubeId: 'K1itLsGmWv0', channel: 'StudyIQ IAS', durationMin: 12,
        assessment: [
            { question: 'Which Indian index measures consumer price inflation?', options: ['Sensex', 'CPI (Consumer Price Index)', 'GDP Deflator', 'WPI Only'], answer: 1, explanation: 'CPI tracks the average price change for a basket of goods that typical Indian families buy.' },
            { question: 'Rising food prices hit which income group MOST?', options: ['Billionaires', 'Middle class', 'Lower income families', 'All equally'], answer: 2, explanation: 'Lower income families spend a larger share of income on food. When food prices rise, they feel it most.' },
            { question: 'India\'s RBI tries to keep inflation at:', options: ['0%', '2% ± 1%', '4% ± 2%', '10% ± 2%'], answer: 2, explanation: 'RBI\'s inflation target is 4%, with a tolerance band of ±2% (between 2% and 6%). Above 6% triggers action.' }
        ]
    },
    {
        id: 'g7-m1-w2-mon', grade: 7, month: 1, week: 2, day: 'Mon',
        topic: 'Introduction to Investing — Risk and Return', description: 'What risk means in investing, and why higher potential returns always come with higher risk.',
        youtubeId: '7mo167ohvJw', channel: 'Khan Academy', durationMin: 7,
        assessment: [
            { question: 'Which typically has the HIGHEST risk AND highest potential return?', options: ['Savings account', 'Fixed Deposit', 'Direct stocks', 'Government bonds'], answer: 2, explanation: 'Direct stocks have highest risk (can go to zero) but also highest potential return (can multiply many times).' },
            { question: 'Risk tolerance means:', options: ['How much loss you can afford emotionally and financially', 'How fast you can run', 'How many stocks you own', 'Your credit score'], answer: 0, explanation: 'Risk tolerance is your ability and willingness to handle investment losses. It depends on age, income, and goals.' },
            { question: 'A "risk-free" investment in India is:', options: ['Real estate', 'Gold ETF', 'Government of India bonds', 'NSE stocks'], answer: 2, explanation: 'Government bonds (G-Secs) are considered risk-free because the Indian government has never defaulted on rupee debt.' }
        ]
    },
    {
        id: 'g7-m1-w2-wed', grade: 7, month: 1, week: 2, day: 'Wed',
        topic: 'How the Stock Market Works', description: 'TED-Ed\'s clear explanation of what a stock exchange is and how buying shares makes you a part-owner of companies.',
        youtubeId: 'p7HKvqRI_Bo', channel: 'TED-Ed', durationMin: 5,
        assessment: [
            { question: 'A stock exchange is:', options: ['A place to buy groceries', 'A marketplace where shares of companies are bought and sold', 'A government bank', 'A type of loan'], answer: 1, explanation: 'A stock exchange (like NSE or BSE) is a marketplace where investors buy and sell shares of public companies.' },
            { question: 'When a company "goes public" (IPO), it:', options: ['Goes bankrupt', 'Opens a new office', 'Sells shares to the general public for the first time', 'Becomes a government company'], answer: 2, explanation: 'An IPO (Initial Public Offering) is when a company first sells its shares to the public to raise money for growth.' },
            { question: 'Why do companies issue shares?', options: ['To pay taxes', 'To raise money for growth without taking loans', 'To reduce employee salaries', 'To avoid bank accounts'], answer: 1, explanation: 'By selling shares, companies raise capital from investors without paying interest — investors get ownership instead.' }
        ]
    },
    {
        id: 'g7-m1-w2-fri', grade: 7, month: 1, week: 2, day: 'Fri',
        topic: 'Bonds vs Stocks — Debt vs Equity', description: 'Understanding the fundamental difference between lending money (bonds) and owning a piece (stocks).',
        youtubeId: 'rs1md3e4aYU', channel: 'Khan Academy', durationMin: 7,
        assessment: [
            { question: 'When you buy a bond, you are:', options: ['Becoming a part-owner of the company', 'Lending money to the company', 'Getting a government grant', 'Taking a risk with no return'], answer: 1, explanation: 'A bond is a loan you give to a company or government. They promise to pay you back with interest.' },
            { question: 'Stocks are generally _____ than bonds:', options: ['Safer and lower return', 'Riskier and higher potential return', 'Safer and higher return', 'Identical in risk'], answer: 1, explanation: 'Stocks are riskier (prices go up and down) but historically give higher returns over the long term.' },
            { question: 'Which is better for someone who needs stable income and low risk?', options: ['Stocks', 'Bonds/FDs', 'Crypto', 'Real estate'], answer: 1, explanation: 'Bonds and FDs give predictable income and are safer. Ideal for those who cannot afford to lose money.' }
        ]
    },
];

// ── LEVEL 4 — Strategist (Grade 8) ───────────────────────────
const grade8: VideoClass[] = [
    {
        id: 'g8-m1-w1-mon', grade: 8, month: 1, week: 1, day: 'Mon',
        topic: 'NSE & BSE — India\'s Stock Exchanges', description: 'Angel One\'s beginner guide to the National Stock Exchange and Bombay Stock Exchange — India\'s twin stock markets.',
        youtubeId: 'WsBC00ywJtY', channel: 'Angel One', durationMin: 10,
        assessment: [
            { question: 'BSE (Bombay Stock Exchange) was established in:', options: ['1947', '1875', '1991', '1932'], answer: 1, explanation: 'BSE is Asia\'s oldest stock exchange, established in 1875 as the "Native Share & Stock Brokers Association".' },
            { question: 'NIFTY 50 represents:', options: ['50 government bonds', '50 largest companies on NSE', 'Top 50 mutual funds', 'Government\'s 50 policies'], answer: 1, explanation: 'NIFTY 50 is an index of the 50 largest and most liquid companies listed on the National Stock Exchange.' },
            { question: 'If NIFTY falls 200 points, it means:', options: ['The government loses money', 'The average value of top 50 stocks decreased', 'Tax rates increased', 'Rupee value fell'], answer: 1, explanation: 'A NIFTY fall means the weighted average market cap of those 50 companies declined — investors\' portfolios lost value.' }
        ]
    },
    {
        id: 'g8-m1-w1-wed', grade: 8, month: 1, week: 1, day: 'Wed',
        topic: 'What is a Share?', description: 'Khan Academy explains equity, dividends, and why owning a share literally makes you a part-owner of a company.',
        youtubeId: '98qfFzqDKR8', channel: 'Khan Academy', durationMin: 8,
        assessment: [
            { question: 'Buying 1 share of a company means:', options: ['Lending them money', 'Becoming a partial owner', 'Getting a fixed interest', 'Paying their bills'], answer: 1, explanation: 'A share represents ownership. If a company has 1,00,000 shares and you own 1, you own 1/1,00,000th of the company.' },
            { question: 'Dividends are paid to shareholders from:', options: ['Bank loans', 'Company profits', 'Government grants', 'Other shareholders'], answer: 1, explanation: 'Dividends are a portion of company profits distributed to shareholders. Not all companies pay dividends.' },
            { question: 'If you buy a share at ₹100 and sell at ₹150, your gain is:', options: ['₹50', '₹150', '₹100', '₹250'], answer: 0, explanation: 'Capital Gain = Sell Price − Buy Price = ₹150 − ₹100 = ₹50 per share. This is called Capital Appreciation.' }
        ]
    },
    {
        id: 'g8-m1-w1-fri', grade: 8, month: 1, week: 1, day: 'Fri',
        topic: 'Risk and Return Relationship', description: 'Understanding the risk-return trade-off — the foundational principle of every investment decision.',
        youtubeId: '7mo167ohvJw', channel: 'Khan Academy', durationMin: 7,
        assessment: [
            { question: 'Which typically has the HIGHEST risk AND highest potential return?', options: ['Savings account', 'Fixed Deposit', 'Direct stocks', 'Government bonds'], answer: 2, explanation: 'Direct stocks have highest risk (can go to zero) but also highest potential return (can multiply many times).' },
            { question: 'Risk tolerance means:', options: ['How much loss you can afford emotionally and financially', 'How fast you can run', 'How many stocks you own', 'Your credit score'], answer: 0, explanation: 'Risk tolerance is your ability and willingness to handle investment losses. It depends on age, income, and goals.' },
            { question: 'Sensex and Nifty are best described as:', options: ['Government bonds', 'Market indices tracking top stocks', 'Types of bank accounts', 'Insurance products'], answer: 1, explanation: 'Sensex tracks top 30 BSE companies; Nifty tracks top 50 NSE companies. They reflect the overall market health.' }
        ]
    },
    {
        id: 'g8-m1-w2-mon', grade: 8, month: 1, week: 2, day: 'Mon',
        topic: 'Sensex & Nifty — Reading the Market', description: 'Finology\'s beginner guide to understanding India\'s market indices and what drives them up and down.',
        youtubeId: 'tf5Caq511BY', channel: 'Finology', durationMin: 11,
        assessment: [
            { question: 'The Sensex tracks how many companies?', options: ['500', '50', '30', '100'], answer: 2, explanation: 'The BSE Sensex tracks the 30 largest and most actively traded companies on the Bombay Stock Exchange.' },
            { question: 'When markets "correct", it means:', options: ['The government fixes prices', 'Stock prices fall significantly from recent highs', 'All profits are corrected to zero', 'A new budget is announced'], answer: 1, explanation: 'A market correction is a 10%+ decline from recent highs. It\'s a normal, healthy part of the market cycle.' },
            { question: 'A "bull market" means:', options: ['Market is falling', 'Only agriculture stocks rise', 'Market is rising consistently', 'A specific sector is crashing'], answer: 2, explanation: 'Bull market = prices rising. Bear market = prices falling. Historically, bull markets last longer than bear markets.' }
        ]
    },
    {
        id: 'g8-m1-w2-wed', grade: 8, month: 1, week: 2, day: 'Wed',
        topic: 'What Is a Demat Account?', description: 'How to open a Demat account in India — the digital wallet that holds your shares electronically.',
        youtubeId: '9ec2eVqR-ec', channel: 'Finology', durationMin: 12,
        assessment: [
            { question: 'A Demat account holds:', options: ['Cash deposits', 'Shares in digital/electronic form', 'Insurance policies', 'Bank loans'], answer: 1, explanation: 'Demat (Dematerialized) account holds your shares electronically — no physical share certificates needed.' },
            { question: 'Which is the correct order to start stock investing in India?', options: ['Buy stocks → Open demat → Link bank', 'Open demat + trading account → Link bank → Buy stocks', 'Visit BSE office → Pay fee → Get shares', 'Only possible after age 25'], answer: 1, explanation: 'You need a Demat account + Trading account (linked to your bank) before you can buy any stocks in India.' },
            { question: 'Who regulates Demat accounts and stock brokers in India?', options: ['RBI', 'SEBI', 'Finance Ministry', 'NSE directly'], answer: 1, explanation: 'SEBI (Securities and Exchange Board of India) regulates all stock brokers, demat accounts, and market activities.' }
        ]
    },
    {
        id: 'g8-m1-w2-fri', grade: 8, month: 1, week: 2, day: 'Fri',
        topic: 'Portfolio Diversification', description: 'Why "don\'t put all your eggs in one basket" is the most important rule in investing — and how to diversify smart.',
        youtubeId: 'rs1md3e4aYU', channel: 'Khan Academy', durationMin: 7,
        assessment: [
            { question: 'Portfolio diversification means:', options: ['Putting all money in one stock', 'Spreading investments across different assets to reduce risk', 'Investing only in gold', 'Keeping money only in FDs'], answer: 1, explanation: 'Diversification spreads your investments so one bad investment doesn\'t destroy your entire portfolio.' },
            { question: 'If you own stocks in 10 different sectors and one crashes by 50%, your portfolio loses approximately:', options: ['50%', '25%', '5%', '0%'], answer: 2, explanation: 'If equal allocation: 1/10 of portfolio × 50% loss = 5% total loss. Diversification protects you!' },
            { question: 'Which combination is most diversified?', options: ['10 tech stocks', 'One FD', 'Mix of stocks, gold, bonds, and real estate', 'All money in crypto'], answer: 2, explanation: 'A diversified portfolio mixes asset classes (stocks, bonds, gold, real estate) that don\'t all move together.' }
        ]
    },
];

// ── LEVEL 5 — Analyst (Grade 9) ──────────────────────────────
const grade9: VideoClass[] = [
    {
        id: 'g9-m1-w1-mon', grade: 9, month: 1, week: 1, day: 'Mon',
        topic: 'Mutual Funds — Investing Made Simple', description: 'Groww\'s beginner-friendly guide to what a mutual fund is, how NAV works, and why SIPs are India\'s most powerful savings tool.',
        youtubeId: 'BF6Lc9CZJWg', channel: 'Groww', durationMin: 12,
        assessment: [
            { question: 'NAV stands for:', options: ['Net Asset Value', 'National Account Verification', 'Nominal Annual Value', 'Net Average Volume'], answer: 0, explanation: 'NAV = Net Asset Value. It\'s the per-unit price of a mutual fund, calculated daily based on the fund\'s holdings.' },
            { question: 'A SIP (Systematic Investment Plan) means:', options: ['Investing a lump sum once', 'Investing a fixed amount every month automatically', 'Taking a loan from mutual funds', 'Selling units every month'], answer: 1, explanation: 'SIP = investing a fixed amount (e.g., ₹500/month) on a set date. It removes timing risk and builds discipline.' },
            { question: 'Rupee Cost Averaging means:', options: ['Averaging your expenses', 'Buying more units when prices are low and fewer when high', 'Converting rupees to dollars', 'Averaging bank interest rates'], answer: 1, explanation: 'With SIPs, the same ₹ amount buys more units when NAV is low and fewer when high — automatically averaging your cost.' }
        ]
    },
    {
        id: 'g9-m1-w1-wed', grade: 9, month: 1, week: 1, day: 'Wed',
        topic: 'SIP vs Lump Sum — Which Is Better?', description: 'Understanding the difference between investing all at once vs regularly — and when each makes sense.',
        youtubeId: '3PGL5pkqwVM', channel: 'Groww', durationMin: 10,
        assessment: [
            { question: 'SIP is better than lump sum investing when:', options: ['You have a large sum ready to invest', 'Markets are at an all-time high and you don\'t know when to invest', 'You are sure the market will rise', 'You only invest once in life'], answer: 1, explanation: 'SIP removes the need to "time the market" — you invest regularly regardless of market level, reducing timing risk.' },
            { question: 'What is the MINIMUM amount you can start a SIP with at most platforms in India?', options: ['₹10,000', '₹5,000', '₹500', '₹100'], answer: 2, explanation: 'Most mutual funds allow SIPs starting from ₹500/month. Some even allow ₹100. You don\'t need to be rich to start!' },
            { question: 'Which habit does SIP build?', options: ['Spending more freely', 'Regular, disciplined investing regardless of market conditions', 'Checking portfolio every hour', 'Avoiding all risk'], answer: 1, explanation: 'SIP builds the discipline of investing regularly — the habit is more important than the amount when starting young.' }
        ]
    },
    {
        id: 'g9-m1-w1-fri', grade: 9, month: 1, week: 1, day: 'Fri',
        topic: 'Debt vs Equity — Two Investing Worlds', description: 'Understanding the fundamental split in investment types — lending (debt) vs owning (equity) — and why you need both.',
        youtubeId: 'rs1md3e4aYU', channel: 'Khan Academy', durationMin: 7,
        assessment: [
            { question: 'Equity investing means:', options: ['Lending money for fixed returns', 'Owning a part of a company', 'Keeping money in FDs', 'Buying government bonds'], answer: 1, explanation: 'Equity = ownership. When you buy stocks or equity mutual funds, you own a piece of real businesses.' },
            { question: 'Which has higher long-term returns historically?', options: ['Fixed deposits', 'Government bonds', 'Equity (stocks)', 'Savings accounts'], answer: 2, explanation: 'Equity has historically given 12-15% annual returns in India over long periods — far above inflation and FD rates.' },
            { question: 'For a 20-year investment goal, which allocation makes more sense?', options: ['100% FDs', '80% equity + 20% debt', '100% gold', '50% crypto'], answer: 1, explanation: 'Long investment horizon → more equity, less debt. The longer your time horizon, the more risk you can take for growth.' }
        ]
    },
    {
        id: 'g9-m1-w2-mon', grade: 9, month: 1, week: 2, day: 'Mon',
        topic: 'Reading the Market — Nifty & Sensex Signals', description: 'How to understand what index movements mean and what signals professionals look for in market data.',
        youtubeId: 'tf5Caq511BY', channel: 'Finology', durationMin: 11,
        assessment: [
            { question: 'A P/E ratio of a stock tells you:', options: ['How profitable the company is in rupees', 'How many years of earnings you are paying for', 'The company\'s sales growth', 'Government tax on the stock'], answer: 1, explanation: 'P/E = Price/Earnings. If P/E is 20, you\'re paying 20× the company\'s annual earnings. Lower P/E = potentially cheaper.' },
            { question: 'FII and DII flows affect the market because:', options: ['They control interest rates', 'Foreign and domestic institutions move large amounts of money into/out of stocks', 'They set NIFTY levels directly', 'They pay dividends to retail investors'], answer: 1, explanation: 'FIIs (Foreign Institutional Investors) and DIIs (Domestic Institutional Investors) move billions. Their buying/selling shifts market.' },
            { question: 'When should a long-term investor panic and sell all stocks?', options: ['When market falls 10%', 'When news is scary', 'Almost never — market corrections are normal', 'When P/E ratio changes'], answer: 2, explanation: 'Long-term investors should not panic during corrections. Historically, every crash was followed by new highs. Stay invested.' }
        ]
    },
];

// ── LEVEL 6 — Investor (Grade 10) ────────────────────────────
const grade10: VideoClass[] = [
    {
        id: 'g10-m1-w1-mon', grade: 10, month: 1, week: 1, day: 'Mon',
        topic: 'GST Explained — India\'s Unified Tax', description: 'How GST (Goods & Services Tax) works in India, why it replaced multiple taxes, and how it affects everyday prices.',
        youtubeId: 'IBr7ooOi6sQ', channel: 'Finology', durationMin: 10,
        assessment: [
            { question: 'GST stands for:', options: ['General Sales Tax', 'Goods and Services Tax', 'Government Supply Tax', 'Gross Standard Tax'], answer: 1, explanation: 'GST = Goods and Services Tax. It replaced 17 different taxes in India with one unified tax system in 2017.' },
            { question: 'GST on food essentials like rice and wheat is:', options: ['28%', '18%', '12%', '0% (zero-rated)'], answer: 3, explanation: 'Basic food items like unbranded rice, wheat, and vegetables are zero-rated under GST — no tax to keep them affordable.' },
            { question: 'GST is collected at:', options: ['Only the factory level', 'Only the retail store level', 'Every step of production and sale', 'Only imports'], answer: 2, explanation: 'GST follows a multi-stage collection process across manufacturing, wholesale, and retail — with input tax credit at each step.' }
        ]
    },
    {
        id: 'g10-m1-w1-wed', grade: 10, month: 1, week: 1, day: 'Wed',
        topic: 'Health Insurance — Why Every Indian Needs It', description: 'The reality of medical costs in India and why a health insurance policy is the most important financial protection.',
        youtubeId: 'BUJv7ehejpU', channel: 'Ditto Insurance', durationMin: 12,
        assessment: [
            { question: 'Health insurance is most important because:', options: ['It earns interest', 'Medical bills can wipe out years of savings', 'The government requires it', 'It reduces tax to zero'], answer: 1, explanation: 'A single hospitalization in India can cost ₹2-10 lakh. Without insurance, this can destroy a family\'s savings.' },
            { question: 'What is a "waiting period" in health insurance?', options: ['Time to get your policy documents', 'Time before you can claim for pre-existing diseases', 'Delay in premium payment', 'Hospital admission wait time'], answer: 1, explanation: 'Most health policies have a 2-4 year waiting period before covering pre-existing conditions. Buy insurance while healthy!' },
            { question: 'Which is generally better value for a healthy 20-year-old?', options: ['Endowment/traditional plan with high premium', 'High-coverage term health plan with low premium', 'Zero-coverage plan', 'FD instead of insurance'], answer: 1, explanation: 'Pure health insurance gives high coverage for low premiums when young and healthy. Buy early, buy comprehensive.' }
        ]
    },
    {
        id: 'g10-m1-w1-fri', grade: 10, month: 1, week: 1, day: 'Fri',
        topic: 'Term vs Life Insurance — What India Gets Wrong', description: 'Ditto Insurance breaks down why most Indians buy the wrong insurance — and what term insurance actually does.',
        youtubeId: 'kiW9amaAaCY', channel: 'Ditto Insurance', durationMin: 12,
        assessment: [
            { question: 'Term insurance is:', options: ['Savings + insurance combined', 'Pure life cover with no investment component', 'A savings plan that matures at 60', 'Only for senior citizens'], answer: 1, explanation: 'Term insurance gives pure life cover — high sum assured for low premium. It\'s NOT an investment product.' },
            { question: 'Who NEEDS a term life insurance policy?', options: ['Children under 18', 'Anyone with financial dependents (family, loans)', 'Only government employees', 'Only people above 50'], answer: 1, explanation: 'If someone depends on your income (parents, spouse, children), you need term insurance so they\'re protected if you die young.' },
            { question: 'At age 25, a ₹1 crore term policy might cost approximately:', options: ['₹2 lakh per year', '₹50,000 per year', '₹8,000-12,000 per year', '₹5,000 per month'], answer: 2, explanation: 'A healthy 25-year-old can get ₹1 crore cover for ₹8,000-12,000/year. Premiums are lowest when you\'re young and healthy.' }
        ]
    },
    {
        id: 'g10-m1-w2-mon', grade: 10, month: 1, week: 2, day: 'Mon',
        topic: 'Retirement Planning — NPS vs PPF', description: 'Two of India\'s best government-backed retirement tools compared — National Pension System vs Public Provident Fund.',
        youtubeId: 'Xq5sroJGiLU', channel: 'IIT Madras', durationMin: 20,
        assessment: [
            { question: 'PPF stands for:', options: ['Private Profit Fund', 'Public Provident Fund', 'Personal Pension Fund', 'Primary Payment Fund'], answer: 1, explanation: 'PPF (Public Provident Fund) is a government-backed savings scheme with a 15-year lock-in, giving ~7-8% tax-free returns.' },
            { question: 'The NPS (National Pension System) is best for:', options: ['Short-term savings under 5 years', 'Long-term retirement savings with equity exposure', 'Borrowing money from the government', 'Paying monthly bills'], answer: 1, explanation: 'NPS is designed for retirement — it invests in a mix of equity and bonds, with withdrawals allowed only at retirement.' },
            { question: 'Which NPS/PPF contribution gets 80C tax deduction?', options: ['Only PPF', 'Only NPS', 'Both PPF and NPS (up to limits)', 'Neither — they are tax-free anyway'], answer: 2, explanation: 'Both PPF (up to ₹1.5L) and NPS (additional ₹50k under 80CCD) give Section 80C/80CCD tax deductions — great tax saving tools.' }
        ]
    },
];

// ── LEVEL 7 — Architect (Grade 11) ───────────────────────────
const grade11: VideoClass[] = [
    {
        id: 'g11-m1-w1-mon', grade: 11, month: 1, week: 1, day: 'Mon',
        topic: 'Index Funds vs Active Funds', description: 'Why most actively managed funds underperform the index over time — and what Warren Buffett recommends for most investors.',
        youtubeId: 'p7HKvqRI_Bo', channel: 'TED-Ed', durationMin: 5,
        assessment: [
            { question: 'An index fund tracks:', options: ['A fund manager\'s picks', 'A market index like NIFTY 50', 'The government bond rate', 'Gold prices'], answer: 1, explanation: 'Index funds passively replicate a market index (like NIFTY 50) by holding the same stocks in the same proportion.' },
            { question: 'Over 15 years, what % of active large-cap funds beat the NIFTY 50?', options: ['80%', '50%', 'Less than 25%', '100%'], answer: 2, explanation: 'SEBI data shows over 15 years, less than 25% of active large-cap funds beat the NIFTY 50. Most underperform.' },
            { question: 'The main advantage of index funds is:', options: ['Higher returns always', 'Lower expense ratios and most beat active funds long-term', 'More fund manager expertise', 'Only available to rich investors'], answer: 1, explanation: 'Index funds have much lower fees (expense ratio ~0.1% vs 1-2% for active funds) — fees compound just like returns do.' }
        ]
    },
    {
        id: 'g11-m1-w1-wed', grade: 11, month: 1, week: 1, day: 'Wed',
        topic: 'Net Worth — How to Measure Your Wealth', description: 'Khan Academy explains what net worth means, how to calculate it, and why tracking it every year is essential.',
        youtubeId: 'CZehGcN4Stg', channel: 'Khan Academy', durationMin: 6,
        assessment: [
            { question: 'Net worth = ?', options: ['Income − Expenses', 'Assets − Liabilities', 'Salary × Years worked', 'Savings × Interest rate'], answer: 1, explanation: 'Net Worth = Assets (everything you own) − Liabilities (everything you owe). This is your true financial position.' },
            { question: 'Your friend earns ₹2 lakh/month but has ₹50 lakh in loans and zero savings. Their net worth is:', options: ['₹2 lakh × 12 = ₹24 lakh positive', 'Negative (₹50 lakh in debt)', 'Zero', '₹24 lakh positive from salary'], answer: 1, explanation: 'High income ≠ high net worth. Net worth depends on what you OWN vs OWE, not what you earn.' },
            { question: 'The best way to grow your net worth is:', options: ['Earn more and spend equally more', 'Increase assets (investments) and reduce liabilities (debt)', 'Take more loans', 'Only focus on income'], answer: 1, explanation: 'Net worth grows when you acquire appreciating assets (stocks, property) and reduce debt. Track it annually.' }
        ]
    },
    {
        id: 'g11-m1-w1-fri', grade: 11, month: 1, week: 1, day: 'Fri',
        topic: 'Asset Allocation — The Most Important Decision', description: 'Why HOW you split your money between stocks, bonds, and gold matters more than which specific stocks you pick.',
        youtubeId: '7mo167ohvJw', channel: 'Khan Academy', durationMin: 7,
        assessment: [
            { question: 'Asset allocation refers to:', options: ['Picking the best individual stocks', 'Dividing investments across different asset classes', 'The number of stocks in your portfolio', 'The minimum amount to invest'], answer: 1, explanation: 'Asset allocation = the strategic split between stocks, bonds, gold, real estate etc. Research shows it drives 90%+ of returns.' },
            { question: 'A common age-based rule for equity allocation is:', options: ['Always 100% equity', '100 minus your age (e.g., age 25 → 75% equity)', '50% equity at all ages', 'Equity only above age 40'], answer: 1, explanation: '"100 minus your age" is a classic starting rule. At 25: 75% equity, 25% debt. Adjust as your goals and risk evolve.' },
            { question: 'Rebalancing your portfolio means:', options: ['Selling all investments and starting over', 'Restoring your target asset allocation when it drifts', 'Moving all money to the best-performing asset', 'Paying taxes on all gains'], answer: 1, explanation: 'If stocks surge, your equity % may exceed your target. Rebalancing sells some stocks and buys bonds to restore balance.' }
        ]
    },
    {
        id: 'g11-m1-w2-mon', grade: 11, month: 1, week: 2, day: 'Mon',
        topic: 'Estate Planning — Wills and Succession', description: 'CNBC-TV18 explains why every earning adult needs a will — and what happens to wealth without one in India.',
        youtubeId: 'WaVHm4CdyDw', channel: 'CNBC-TV18', durationMin: 15,
        assessment: [
            { question: 'A "Will" is:', options: ['A letter of complaint', 'A legal document specifying who inherits your assets after death', 'A bank guarantee', 'A type of insurance policy'], answer: 1, explanation: 'A Will (Last Will & Testament) is a legal document that specifies exactly who should inherit your assets when you die.' },
            { question: 'What happens if you die without a Will in India?', options: ['Everything goes to the government', 'Assets distributed per Hindu Succession Act or personal law', 'Banks keep all the money', 'Spouse automatically gets everything'], answer: 1, explanation: 'Without a Will (intestate), assets follow succession laws — which may not match your wishes and can cause family disputes.' },
            { question: 'A "nominee" on a bank account vs a "legal heir" — who gets the money?', options: ['Nominee gets everything permanently', 'Legal heirs inherit — nominee is a temporary trustee', 'Both get 50%', 'Neither — RBI takes it'], answer: 1, explanation: 'A nominee receives funds from the bank but must distribute to legal heirs. A Will overrides nominee designations in courts.' }
        ]
    },
];

// ── LEVEL 8 — Master (Grade 12) ──────────────────────────────
const grade12: VideoClass[] = [
    {
        id: 'g12-m1-w1-mon', grade: 12, month: 1, week: 1, day: 'Mon',
        topic: 'FIRE — Financial Independence, Retire Early', description: 'J.P. Morgan explains the mathematics of the FIRE movement and the 4% Rule — the formula used to retire decades early.',
        youtubeId: 'isqpzOsMluI', channel: 'J.P. Morgan', durationMin: 8,
        assessment: [
            { question: 'FIRE stands for:', options: ['Fast Income, Rapid Exit', 'Financial Independence, Retire Early', 'Fixed Income, Real Estate', 'Finance, Investment, Returns, Equity'], answer: 1, explanation: 'FIRE = Financial Independence, Retire Early. Build enough wealth to live off investment returns without needing a job.' },
            { question: 'The "25x Rule" for FIRE means:', options: ['Save 25% of income', 'You need 25× your annual expenses invested', 'Retire at 25', 'Earn 25 times your age'], answer: 1, explanation: 'To retire, you need ~25× your annual expenses invested. At 4% withdrawal, this sustains you indefinitely.' },
            { question: 'If your annual expenses are ₹6 lakh, your FIRE number is:', options: ['₹6 lakh', '₹60 lakh', '₹1.5 crore', '₹6 crore'], answer: 2, explanation: 'FIRE number = 25 × annual expenses = 25 × ₹6 lakh = ₹1.5 crore. Invest this and withdraw 4% (₹6L) annually.' }
        ]
    },
    {
        id: 'g12-m1-w1-wed', grade: 12, month: 1, week: 1, day: 'Wed',
        topic: 'Building Multiple Income Streams', description: 'How to create 5+ sources of income in your 20s — from side hustles to passive investments — with real examples.',
        youtubeId: 'B6iWpu_srx8', channel: 'Humphrey Yang', durationMin: 12,
        assessment: [
            { question: 'Passive income means:', options: ['Income from a government job', 'Earning money with minimal ongoing effort after initial setup', 'Income from a part-time job', 'Monthly salary'], answer: 1, explanation: 'Passive income (dividends, rental, royalties) works while you sleep — unlike active income which requires your time directly.' },
            { question: 'Which of these is a scalable income stream?', options: ['Your hourly salary', 'A YouTube channel or blog (digital content)', 'Working overtime at a factory', 'Borrowing more money'], answer: 1, explanation: 'Digital content scales — 1 video can earn money for 10 years. Your salary stops the moment you stop working.' },
            { question: 'The IDEAL order of building wealth is:', options: ['Spend → Earn → Save', 'Earn → Save → Invest → Build passive income', 'Invest → Earn → Spend everything', 'Borrow → Invest → Repay'], answer: 1, explanation: 'Earn, save aggressively, invest those savings to build passive income. Each stream reduces your dependence on a single job.' }
        ]
    },
    {
        id: 'g12-m1-w1-fri', grade: 12, month: 1, week: 1, day: 'Fri',
        topic: 'NPS and PPF — India\'s Retirement Backbone', description: 'A deep-dive into India\'s two most powerful retirement instruments and exactly how to use them for a comfortable future.',
        youtubeId: 'Xq5sroJGiLU', channel: 'IIT Madras', durationMin: 20,
        assessment: [
            { question: 'The minimum investment in PPF per year is:', options: ['₹50,000', '₹1,000', '₹500', '₹10,000'], answer: 1, explanation: 'PPF requires a minimum of ₹500/year (up to ₹1.5 lakh). You can invest in small instalments throughout the year.' },
            { question: 'NPS Tier 1 vs Tier 2 — what is the key difference?', options: ['Tier 1 is for government, Tier 2 for private', 'Tier 1 has lock-in until retirement; Tier 2 allows free withdrawal', 'Tier 1 gives more returns always', 'No difference'], answer: 1, explanation: 'Tier 1 (mandatory, retirement-focused) locks money until 60. Tier 2 (optional, flexible) allows withdrawal anytime.' },
            { question: 'The additional NPS tax benefit under Section 80CCD(1B) allows deduction of:', options: ['₹50,000 over and above 80C limit', '₹1 lakh only', '₹25,000 only if salaried', '₹10,000 with no conditions'], answer: 0, explanation: 'NPS gives an EXTRA ₹50,000 deduction under 80CCD(1B) — on top of the ₹1.5L under 80C. Total possible: ₹2L in deductions.' }
        ]
    },
    {
        id: 'g12-m1-w2-mon', grade: 12, month: 1, week: 2, day: 'Mon',
        topic: 'Social Entrepreneurship — Business with Purpose', description: 'How India\'s startup ecosystem is creating solutions for education, healthcare, and agriculture — and how to be part of it.',
        youtubeId: 'p7HKvqRI_Bo', channel: 'TED-Ed', durationMin: 5,
        assessment: [
            { question: 'Social entrepreneurship differs from regular business because:', options: ['It makes less money always', 'It prioritizes solving social problems alongside financial returns', 'It is only for non-profits', 'The government runs it'], answer: 1, explanation: 'Social entrepreneurs build businesses that create measurable social impact — not just profits. Think Byju\'s, Ola, or Jio\'s affordability mission.' },
            { question: 'India\'s startup ecosystem is approximately ranked in the world:', options: ['1st', '3rd', '10th', '25th'], answer: 1, explanation: 'India has the 3rd largest startup ecosystem globally (after USA and China), with 100+ unicorns as of 2024.' },
            { question: 'What financial skill is MOST critical for a startup founder?', options: ['Stock trading', 'Cash flow management — knowing when money comes in and goes out', 'Real estate investment', 'Cryptocurrency trading'], answer: 1, explanation: 'Most startups fail from cash flow problems, not bad ideas. Knowing when you\'ll run out of money is a survival skill.' }
        ]
    },
];

// ────────────────────────────────────────────────────────────
// Filler session generator with 20 diverse verified video topics
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
                        description: `${d === 'Mon' ? t.mon : d === 'Wed' ? t.wed : t.fri} — Module ${m}, Week ${w} deep dive.`,
                        youtubeId: t.youtubeId,
                        channel: t.channel,
                        durationMin: 8,
                        assessment: [
                            { question: 'What was the main financial concept covered in this session?', options: ['How to spend more', 'The key financial concept discussed in the video', 'Government tax policies only', 'How to avoid saving'], answer: 1, explanation: 'Always identify the main concept — it helps you retain and apply the knowledge in real life.' },
                            { question: 'Which habit does this module encourage?', options: ['Spending without thinking', 'Ignoring personal finance', 'Making informed, intentional money decisions', 'Avoiding banks and investments'], answer: 2, explanation: 'Every WealthWise lesson builds the habit of making conscious, informed decisions — not reacting impulsively to money.' },
                            { question: 'The best way to retain this lesson is:', options: ['Forget it after the test', 'Share one insight with a parent or friend this week', 'Only use it after age 18', 'Wait for a teacher to apply it for you'], answer: 1, explanation: 'Teaching others solidifies learning. Share one thing you learned today — you\'ll remember it far longer.' }
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
        { mon: 'What Is Money?', wed: 'History of Currency', fri: 'Needs vs Wants', youtubeId: 'GZ7y-yFdX9M', channel: 'Peekaboo Kidz' },
        { mon: 'How Banks Work', wed: 'Savings Accounts & FDs', fri: 'Banking Safety in India', youtubeId: 'E-HOz8T6tAo', channel: 'Khan Academy' },
        { mon: 'Supply and Demand', wed: 'Price Movements in Markets', fri: 'Indian Market Examples', youtubeId: 'g9aDizJpd_s', channel: 'Crash Course' },
        { mon: 'What Is Inflation?', wed: 'RBI and Monetary Policy', fri: 'Protecting Savings from Inflation', youtubeId: 'yahEP620480', channel: 'Khan Academy' },
        { mon: 'Emergency Fund Basics', wed: 'Budget Planning', fri: 'Smart Spending Habits', youtubeId: 'vftjBTjFlzI', channel: 'Two Cents PBS' },
        { mon: 'Compound Interest Magic', wed: 'Rule of 72', fri: 'Power of Starting Early', youtubeId: 'Rm6UdfRs3gw', channel: 'Khan Academy' },
        { mon: 'NSE and BSE Explained', wed: 'Sensex and Nifty', fri: 'How to Read Market News', youtubeId: 'WsBC00ywJtY', channel: 'Angel One' },
        { mon: 'Mutual Funds India', wed: 'SIP Investing', fri: 'Choosing the Right Fund', youtubeId: 'BF6Lc9CZJWg', channel: 'Groww' },
        { mon: 'GST and Indirect Taxes', wed: 'Income Tax Basics', fri: 'Tax Planning for Young Earners', youtubeId: 'IBr7ooOi6sQ', channel: 'Finology' },
        { mon: 'Risk and Return', wed: 'Portfolio Diversification', fri: 'Long-term vs Short-term Investing', youtubeId: '7mo167ohvJw', channel: 'Khan Academy' },
        { mon: 'UPI and Digital Payments', wed: 'Online Financial Safety', fri: 'Scam Prevention', youtubeId: 'dOcq91qxQb4', channel: 'CNBC-TV18' },
        { mon: 'What Is a Share?', wed: 'Reading a Stock Chart', fri: 'Buying Your First Stock', youtubeId: '98qfFzqDKR8', channel: 'Khan Academy' },
        { mon: 'Health Insurance India', wed: 'Term Life Insurance', fri: 'Insurance vs Investment', youtubeId: 'BUJv7ehejpU', channel: 'Ditto Insurance' },
        { mon: 'FIRE and Financial Independence', wed: 'Retirement Planning NPS PPF', fri: 'Building Long-term Wealth', youtubeId: 'isqpzOsMluI', channel: 'J.P. Morgan' },
        { mon: 'Bonds vs Stocks', wed: 'Debt and Equity Balance', fri: 'Asset Allocation Strategy', youtubeId: 'rs1md3e4aYU', channel: 'Khan Academy' },
        { mon: 'Real vs Nominal Returns', wed: 'Beating Inflation with Investing', fri: 'Smart Long-term Choices', youtubeId: 'yiE7QgcJwwQ', channel: 'Khan Academy' },
        { mon: 'What is GDP?', wed: 'India\'s Economic Growth Story', fri: 'How Economy Affects Your Money', youtubeId: 'zh8XASZxo1Q', channel: 'Khan Academy' },
        { mon: 'How Stock Market Works', wed: 'Market Cycles — Bull and Bear', fri: 'Long-term Investor Mindset', youtubeId: 'p7HKvqRI_Bo', channel: 'TED-Ed' },
        { mon: 'Net Worth Building', wed: 'Financial Goals Setting', fri: 'Track Your Wealth Journey', youtubeId: 'CZehGcN4Stg', channel: 'Khan Academy' },
        { mon: 'Multiple Income Streams', wed: 'Passive Income Ideas India', fri: 'Building Financial Freedom', youtubeId: 'B6iWpu_srx8', channel: 'Humphrey Yang' },
    ];
    return [...seed, ...makeFillerSessions(gradeNum, existingIds, topicRotation)];
}

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
