import type { GradeSyllabus } from './curriculumTypes';

export const grade8: GradeSyllabus = {
    grade: 8,
    bookTitle: 'The Strategist',
    subtitle: 'Banking, Budgets & the System',
    theme: 'analytical',
    complexityNote: 'Full financial product mechanics. Calculations with budgeting formulas. Balance sheet thinking introduced.',
    modules: [
        {
            month: 'April',
            topic: 'The 50/30/20 Budget: Your Personal Finance Constitution',
            type: 'Theory',
            status: 'passed',
            score: 87,
            proTip: 'Wealth is not about how much you earn — it is about how much of every rupee you keep and put to work.',
            steps: [
                {
                    title: 'Why Even High Earners Go Broke',
                    story: `Priya's father earned ₹2.2 Lakhs per month as a senior engineer at Tata Motors. Yet every January, before salary arrived, the family was counting days. The EMIs on two cars, the club membership, the branded clothes, Swiggy every other night — it added up to ₹2.1 Lakhs without anyone noticing. "We earn good money," her mother would say, "but we save nothing." One evening Priya sat with her father and made a list. For the first time, they saw it: 61% of income on needs, 34% on wants, just 5% saved. The 50/30/20 rule they read about online showed exactly where the problem was — and gave them the map to fix it. Within six months of following the framework, they had built a ₹3 Lakh emergency fund.`,
                    body: `**Why Budgets Fail — and Why the 50/30/20 Rule Works**\n\nIndia's National Consumer Helpline receives over 3 Lakh complaints annually related to personal loan defaults and debt traps. Shockingly, a large fraction of complainants are salaried professionals with decent incomes — doctors, engineers, government officers.\n\nThe problem is almost never low income. It is the **complete absence of a spending plan**.\n\n**Without a budget:**\n- You never know where your money actually goes\n- Savings get whatever scraps are left (usually nothing)\n- Lifestyle expands automatically with income — called **"Lifestyle Creep"**\n- Every salary hike is absorbed by higher wants spending before it can build wealth\n\n**The 50/30/20 Rule — Origin and Logic:**\nPopularized by U.S. Senator Elizabeth Warren in the book *All Your Worth*, this framework divides after-tax income into three purposeful buckets:\n\n| Bucket | % | What Goes Here |\n|---|---|---|\n| **Needs** | 50% | Rent, groceries, school fees, medicines, transport, electricity |\n| **Wants** | 30% | Dining out, OTT, gadgets, vacations, movies, fashion beyond basics |\n| **Savings** | 20% | Emergency fund, SIPs, FDs, goal-based investing |\n\n**The critical insight:** Most people fund Needs first, then Wants, and save whatever remains. The wealthy reverse this — they save first, fund Needs second, and let Wants fit into what's left. This is called **"Paying Yourself First."**\n\n**For Students:** Even on ₹200/week pocket money, apply the rule: ₹40 to savings, ₹100 to needs, ₹60 freely for wants. Over a school year, ₹40/week compounds into ₹2,000+ plus the habit of saving — which is worth far more.`,
                    activity: `Apply the 50/30/20 rule to your pocket money for exactly one month. Set up three physical envelopes or a notebook with three columns: Needs, Wants, Savings. At the start of the month, divide your money. Track every rupee you spend. At month-end: Did you stay within each bucket? Which was hardest to control?`,
                },
                {
                    title: 'The 50/30/20 Framework — Building Your Money Constitution',
                    body: `**Deep Dive: What Belongs in Each Bucket**\n\n**NEEDS (50%) — The Survival Category**\nThink: if I lost my job tomorrow, what would I STILL have to pay?\n- Rent or home loan EMI\n- Basic groceries and food cooked at home\n- School / college fees and stationery\n- Electricity, water, phone bills (basic plan)\n- Transportation to work/school (auto, bus, petrol for the one essential vehicle)\n- Medicines and basic healthcare\n- Minimum insurance premiums\n\n⚠️ **Red flag:** If your needs exceed 50% of income, you may be living in a home, driving a car, or holding debt beyond your income level. Corrective action is urgent.\n\n**WANTS (30%) — The Lifestyle Category**\nThink: these are real and legitimate — but they are CHOICES, not obligations.\n- Zomato, Swiggy, restaurant dining\n- Netflix, Amazon Prime, Hotstar subscriptions\n- New clothes beyond functional basics\n- Weekend outings, movies, events\n- Gym memberships, hobby classes\n- Upgraded gadgets (phone works fine; new one is a want)\n\n⚠️ **Red flag:** The wants category is where most financial disasters hide. Small, daily spending — ₹200 coffee here, ₹500 UberEats there — adds up to lakhs annually that people genuinely cannot account for.\n\n**SAVINGS (20%) — The Freedom Category**\nThink: this is not what's "left over." This is the FIRST debit on salary day.\n- Emergency Fund (priority #1 — until you have 6 months of expenses saved)\n- SIP in Index Mutual Fund (priority #2 — automates long-term wealth)\n- Short-term goal savings (education, phone, travel — dedicated RD or savings)\n- Any additional investing (stocks, ETFs, PPF)\n\n**The Automation Trick:**\nSet up an auto-debit SIP or RD on the day after your family's salary arrives. Money moved automatically cannot be spent. This is the single most effective behavioral finance trick available to ordinary earners.\n\n**Calculating the 50/30/20 on Real Indian Income:**\n| Income | Needs (50%) | Wants (30%) | Savings (20%) |\n|---|---|---|---|\n| ₹30,000/month | ₹15,000 | ₹9,000 | ₹6,000 |\n| ₹60,000/month | ₹30,000 | ₹18,000 | ₹12,000 |\n| ₹1,00,000/month | ₹50,000 | ₹30,000 | ₹20,000 |\n| ₹2,00,000/month | ₹1,00,000 | ₹60,000 | ₹40,000 |`,
                    funFact: `A 2022 survey by the Reserve Bank of India found that **65% of Indian urban households** had no formal budget and could not accurately report their monthly expenditure by category within a 10% margin of error. Financial planners call this "financial blindness" — you cannot optimize what you cannot see.`,
                    activity: `Ask your parent for your family's last monthly bank statement (or UPI transaction history on PhonePe/GPay). Together, categorize every transaction into Needs, Wants, or Savings. Calculate the actual percentages. How close are you to 50/30/20? What is the single biggest "leak" in the Wants category?`,
                },
                {
                    title: 'The Family Budget Audit — A Real Exercise',
                    body: `**Turning Theory Into Action: The Real Household Budget Audit**\n\nThis exercise is the most impactful financial activity a family can do together. It typically takes 60-90 minutes and produces insights that change behavior immediately.\n\n**Step 1: Gather Your Data**\n- Last month's bank passbook or bank statement (online)\n- UPI transaction history (GPay / PhonePe / Paytm)\n- Credit card statement (if any)\n- Any cash expenses (estimate from receipts or memory)\n\n**Step 2: Categorize Every Transaction**\nCreate a simple table:\n| Category | Monthly Amount | % of Income |\n|---|---|---|\n| Rent / Home Loan EMI | | |\n| Groceries | | |\n| School Fees (monthly share) | | |\n| Electricity + Internet + Phone | | |\n| Transport / Petrol | | |\n| Eating Out + Food Delivery | | |\n| Entertainment / OTT | | |\n| Shopping / Clothes / Gadgets | | |\n| Medical | | |\n| Savings Invested | | |\n| **TOTAL** | | 100% |\n\n**Step 3: Identify the Gaps**\nMost families discover:\n- **Eating out / food delivery is 2-3x what they thought.** ₹3,000 estimated; ₹8,000 actual.\n- **Multiple overlapping OTT subscriptions** they forgot about (Netflix + Prime + Hotstar + Zee5 = ₹1,800/month)\n- **Savings are 3-5%** instead of the target 20%\n- **Forgotten subscriptions:** App fees, app renewals, club memberships auto-charging\n\n**Step 4: The "Savings First" Correction**\nIf savings are below 20%: Set up an SIP or RD auto-debit **on salary day**. Automate the savings before lifestyle spending consumes it. For most families, cutting two food delivery orders per week frees ₹2,000-₹3,000/month — enough to start meaningful wealth building.\n\n**The Long-Term Impact:**\nA family that saves ₹6,000/month (on ₹30K income — 20%) invested at 12% CAGR builds:\n- In 10 years: ₹13.9 Lakhs\n- In 20 years: ₹59.9 Lakhs\n- In 30 years: ₹2.1 Crore\n\nAll from just 20% savings on a ₹30K income — without ever getting a raise.`,
                    activity: `🏠 HOME ACTIVITY: Conduct the full Budget Audit with your parent using last month's data. Create a simple pie chart showing the percentage split across categories. Present one specific recommendation for improvement. Calculate: if that one change is made, how much additional wealth will the family build in 10 years (use Rule of 72 or a SIP calculator)?`,
                },
            ],
            unitTest: [
                {
                    q: 'In the 50/30/20 rule, which bucket gets funded FIRST (before any spending)?',
                    options: ['Wants — enjoy life first', 'Needs — survival is primary', 'Savings — pay yourself first', 'All three equally'],
                    correct: 2,
                    explanation: 'The most powerful behavioral change in personal finance is treating Savings as the FIRST expense — auto-deducted on salary day before anything is spent. When savings come last, lifestyle always expands to consume all available money. When savings come first, lifestyle naturally adjusts to the remainder. This single habit is the foundation of every wealth-building journey.',
                },
                {
                    q: 'A family earns ₹80,000/month. Their rent is ₹25,000, groceries ₹12,000, school fees ₹8,000, eating out ₹18,000, OTT ₹2,000, and savings ₹5,000. What is their actual savings rate?',
                    options: ['20% (target)', '10% (below target)', '6.25% (dangerously low)', '30% (above target)'],
                    correct: 2,
                    explanation: '₹5,000 ÷ ₹80,000 = 6.25%. This family is saving less than one-third of the 20% target. Meanwhile, eating out (₹18,000) is 22.5% of income — higher than their entire savings. The fix: cut food delivery by ₹10,000/month, redirect to savings (₹15,000 = 18.75%). That single change transforms their financial trajectory.',
                },
                {
                    q: '"Lifestyle Creep" describes which phenomenon?',
                    options: ['Prices rising due to inflation', 'Expenses automatically expanding to consume all income increases, leaving savings unchanged', 'Banks charging hidden fees', 'Children spending more than parents'],
                    correct: 1,
                    explanation: 'Lifestyle Creep is the universal tendency for spending to expand in step with income growth — new car when salary rises, better apartment, more eating out, premium subscriptions. Without a deliberate budget, every salary hike is consumed by upgraded wants, leaving the savings rate permanently stuck at its original low level. The 50/30/20 framework is specifically designed to contain Lifestyle Creep.',
                },
                {
                    q: 'The "50" in 50/30/20 represents which category?',
                    options: ['50% Savings', '50% Wants', '50% Needs', '50% Taxes'],
                    correct: 2,
                    explanation: '50% is allocated to Needs — the non-negotiable expenses required for basic functioning: rent, food, school fees, utilities, transport, medicine. If your Needs exceed 50% of your income, the framework signals that your fixed costs are too high relative to your income, and structural changes (not just cutting wants) may be required.',
                },
                {
                    q: 'If savings are set up as an auto-debit SIP on salary day, what behavioral effect does this create?',
                    options: ['It reduces the interest earned on savings', 'It makes saving automatic and involuntary — people cannot spend what they never see', 'Banks charge extra fees for auto-debits', 'It requires government approval'],
                    correct: 1,
                    explanation: 'Behavioral economists call this "pre-commitment" — removing the temptation by removing the decision. When savings are deducted automatically, you never "decide" not to save. The brain adapts to the remaining balance as "full income." This is why SIP-based wealth building works for ordinary earners who struggle with self-discipline: the system replaces willpower.',
                },
            ],
        },
        {
            month: 'May',
            topic: 'Banking Products — FD, RD, Savings Account Mechanics',
            type: 'Theory',
            status: 'passed',
            score: 82,
            proTip: 'A bank is not a charity — it uses your deposits to earn 3-5x the interest it pays you. Understand who is working for whom.',
            steps: [
                {
                    title: 'The Business Model of a Bank',
                    story: `Shreya was doing a school project on banks and visited the local SBI branch. She asked the manager, "If I put ₹1 Lakh in savings, you give me 3.5% interest. Where do you GET the money to pay me?" The manager smiled: "We take your ₹1 Lakh and lend it to a small business owner who needs working capital. We charge him 14%. We pay you 3.5%. We keep the 10.5% difference — that's our profit." Shreya came home and thought: I am giving the bank my raw material. They process it and sell it at 4x the price. She began wondering how she could become more like the bank — a lender of capital — rather than just a depositor. That question sent her down the path of investing.`,
                    body: `**How a Bank Makes Money — The Fundamental Truth**\n\nA bank is a for-profit business. Its product is money. Before you choose any banking product, you must understand its core profit mechanism:\n\n1. You deposit ₹1,00,000 in a savings account → Bank pays you **3.5% interest** (₹3,500/year)\n2. Bank pools your money with thousands of other depositors\n3. Bank lends that money as:\n   - Home loan: **8.5%**\n   - Car loan: **9-11%**\n   - Personal loan: **12-18%**\n   - Business loan: **12-16%**\n   - Credit card: **36-42%**\n4. Bank's profit = (Lending Rate) - (Deposit Rate) = **Net Interest Margin (NIM)**\n\n**India's Major Banks — NIM (FY2024):**\n| Bank | NIM | Assets (₹ Crore) | Annual NIM Profit |\n|---|---|---|---|\n| HDFC Bank | ~4.1% | ₹25,00,000 Cr | ~₹1,02,500 Cr |\n| SBI | ~3.4% | ₹38,00,000 Cr | ~₹1,29,200 Cr |\n| ICICI Bank | ~4.5% | ₹14,00,000 Cr | ~₹63,000 Cr |\n\n**What this means for you:** Every rupee in your savings account is the bank's raw material. They convert your 3.5% deposit into a 12% business loan and pocket the 8.5% spread. The bank is a machine for converting idle savings into active capital — and capturing most of the profit.\n\n**The Financially Literate Response:** Don't abandon banking — it's essential. But don't let all your long-term money sit at 3.5% when there are legal options (Index Funds, NPS, PPF) that give 7-14% returns on the same money.`,
                    funFact: `HDFC Bank earned a Net Interest Income of over ₹89,000 Crore in FY2024 — meaning the spread between what it paid depositors and charged borrowers, multiplied by its massive loan book, generated nearly ₹90,000 Crore in one year. This is entirely built on ordinary Indians' savings deposits.`,
                },
                {
                    title: 'Fixed Deposits and Recurring Deposits — The Safe Tools',
                    body: `**Fixed Deposit (FD) — Everything You Need to Know**\n\nAn FD locks your money for a fixed period at a guaranteed interest rate. At maturity, you receive principal plus interest.\n\n**Current FD Rates (2024):**\n| Bank | 1-Year Rate | 3-Year Rate | Senior Citizen Bonus |\n|---|---|---|---|\n| SBI | 6.8% | 6.75% | +0.5% |\n| HDFC Bank | 7.0% | 7.0% | +0.5% |\n| ICICI Bank | 7.0% | 7.0% | +0.5% |\n| Axis Bank | 7.1% | 7.1% | +0.5% |\n| Utkarsh SFB | 8.5% | 8.0% | +0.5% |\n\n**✅ FD Advantages:**\n- Capital is 100% safe (DICGC insures up to ₹5 Lakh per depositor per bank)\n- Guaranteed return — no market risk whatsoever\n- Can be used as loan collateral (up to 90% of FD value)\n- Senior citizens earn an additional 0.5% on most FDs\n- Can be opened with as little as ₹1,000 at most banks\n\n**❌ FD Disadvantages:**\n- Interest is FULLY TAXABLE as "Income from Other Sources" at your slab rate\n- For someone in the 30% tax bracket: 7% FD → 4.9% post-tax → BELOW 6% inflation → net wealth loss\n- Premature withdrawal penalty of 0.5-1% (reduces effective return)\n- No protection against long-term inflation erosion\n\n**When to Use FD:**\n- Emergency Fund parking\n- Short-term goals (< 3 years): school fees next year, planned medical expense\n- Capital you absolutely cannot risk (elderly parents' savings)\n\n---\n\n**Recurring Deposit (RD) — The Monthly FD**\n\nAn RD lets you deposit a fixed amount every month (minimum ₹100-₹500 at most banks), compounding at FD-equivalent rates.\n\n**Example: ₹2,000/month RD at SBI, 7%, 3 years:**\n- Total deposited: ₹2,000 × 36 = ₹72,000\n- Maturity amount: ≈ ₹79,800\n- Interest earned: ≈ ₹7,800\n\n**Best Use of RD:** Building an Emergency Fund systematically when you don't have a lump sum.`,
                    activity: `FD Calculation Challenge: Your grandparent has ₹4 Lakhs to invest in an SBI FD at 7.3% for 3 years (assume annual compounding). Calculate the maturity amount: A = 4,00,000 × (1.073)^3. Then calculate: how much of the interest will be taxable if they are in the 20% tax bracket? Is the post-tax return higher or lower than the current inflation rate of 5.5%?`,
                },
                {
                    title: 'The Emergency Fund — Your Financial Parachute',
                    body: `**The Most Important Financial Product That Isn't Marketed**\n\nBanks advertise FDs, insurance companies push ULIPs, and mutual fund apps promote SIPs — but almost nobody aggressively markets the Emergency Fund. Yet financial planners universally agree: building an Emergency Fund is **Step Zero of all wealth building**.\n\n**Why an Emergency Fund Changes Everything:**\nWithout an Emergency Fund, ONE crisis can destroy years of wealth building:\n- Job loss (average time to find equivalent employment: 2-4 months)\n- Medical emergency (hospitalisation can cost ₹50,000-₹5 Lakhs without health insurance)\n- Major appliance / vehicle repair\n- Family crisis requiring travel\n\nWithout an emergency fund, most people take a **Personal Loan (14-18% interest)** or swipe a **Credit Card (36-42% interest)** to cover these events — creating debt spirals that take years to escape.\n\n**Emergency Fund Formula:**\nTarget = **3-6 months × Essential Monthly Expenses (Needs only)**\n\n**Example for a family with ₹45,000/month in essential expenses:**\n- 3-month target: ₹1,35,000\n- 6-month target: ₹2,70,000\n\n**Where to Keep the Emergency Fund:**\n| Option | Rate | Accessible In | Recommended? |\n|---|---|---|---|\n| Regular Savings Account | 3.5% | Instant | ❌ Too low return |\n| High-yield Savings (Kotak, DBS) | 6-7% | Instant | ✅ Good |\n| Liquid Mutual Fund | 7-8% | 1 business day | ✅ Best option |\n| FD (with sweep facility) | 6-7.5% | 1-3 days | ✅ Good |\n| Equity Mutual Fund | 12% avg | 2-3 days | ❌ Value can be down 30% in a crisis |\n\n**Critical Rule:** The Emergency Fund is NOT for school fees, vacation, new phone, or car repairs you could plan for. It is ONLY for genuine unexpected emergencies. Treating it as a spending pool destroys its purpose.\n\n**Building the Emergency Fund on a Tight Budget:**\nIf your family cannot set aside a large lump sum immediately, start an RD of ₹2,000-₹3,000/month in a liquid mutual fund. In 12 months, you'll have ₹24,000-₹36,000 — enough for a partial emergency cushion, with more building monthly.`,
                    activity: `🏠 HOME ACTIVITY: Ask your parent: "Do we have an Emergency Fund? How many months of expenses does it cover?" Calculate your family's 3-month and 6-month emergency fund targets based on your actual monthly essential expenses. If the fund is incomplete, discuss: what is one monthly expense that could be reduced to contribute ₹1,500-₹2,000/month to build it within 12-18 months?`,
                },
            ],
            unitTest: [
                {
                    q: 'A bank pays depositors 3.5% on savings accounts and charges borrowers 14% on business loans. What is the bank\'s Net Interest Margin (NIM)?',
                    options: ['3.5%', '10.5%', '14%', '17.5%'],
                    correct: 1,
                    explanation: 'NIM = Lending Rate - Deposit Rate = 14% - 3.5% = 10.5%. This is the bank\'s gross profit per rupee deployed. Out of every ₹100 deposited, the bank earns ₹14 from lending, pays ₹3.50 to the depositor, and retains ₹10.50 to cover operations and profit. This is why banks are among the most profitable businesses in India — they handle the capital of billions of depositors.',
                },
                {
                    q: 'Interest earned on a Fixed Deposit is taxed as:',
                    options: ['Exempt (like PPF)', 'Capital Gains at 12.5%', 'Income from Other Sources at your full slab rate', 'A flat 10% TDS with no further liability'],
                    correct: 2,
                    explanation: 'FD interest is "Income from Other Sources" — fully taxable at your applicable income tax slab rate. For someone in the 30% bracket, a 7% FD earns only 4.9% post-tax. After 6% inflation, the real post-tax return is -1.1% — meaning they are actually losing purchasing power despite "earning" interest. This is why FDs are not wealth-building tools for long time horizons.',
                },
                {
                    q: 'DICGC deposit insurance covers bank deposits up to:',
                    options: ['₹1 Lakh per bank', '₹2 Lakh per bank', '₹5 Lakh per depositor per bank', '₹10 Lakh per family'],
                    correct: 2,
                    explanation: 'DICGC (Deposit Insurance and Credit Guarantee Corporation), backed by RBI, insures deposits up to ₹5 Lakhs per depositor per bank (effective 2020, raised from ₹1 Lakh). If a bank collapses, you will receive up to ₹5 Lakhs back regardless. This is critical when choosing smaller banks (like Small Finance Banks) that offer higher FD rates — the higher rate is only safe up to this insured limit.',
                },
                {
                    q: 'Which is the BEST place to park a family\'s Emergency Fund?',
                    options: ['Equity Mutual Fund (12% returns)', 'Savings account (3.5% — zero risk)', 'Liquid Mutual Fund (7-8%, accessible in 1 business day)', 'Real estate (10-12% returns)'],
                    correct: 2,
                    explanation: 'Emergency funds require both safety AND liquidity. Equity funds can fall 30-40% in a crisis — the worst time to need emergency money. A savings account at 3.5% is safe but earns poorly. Liquid Mutual Funds hold only short-term government bonds, carry virtually zero risk, earn 7-8%, and can be redeemed within 1 business day. They are the ideal emergency fund vehicle.',
                },
                {
                    q: 'A family needs a 6-month Emergency Fund. Their monthly essential expenses are ₹50,000. How much should they target?',
                    options: ['₹50,000', '₹1,50,000', '₹3,00,000', '₹6,00,000'],
                    correct: 2,
                    explanation: '6-month Emergency Fund = 6 × ₹50,000 = ₹3,00,000. This covers: 6 months of job loss, a major medical event, or a significant family crisis — without needing to take any loans or liquidate investments. "Essential expenses" means needs only — rent, food, school fees, utilities, medicine — not wants like dining out or entertainment.',
                },
            ],
        },
        {
            month: 'June',
            topic: '☀️ Summer Activity — Family Budget Tracker',
            type: 'Summer Activity',
            status: 'locked',
            proTip: 'What gets tracked, gets managed. Most families reduce expenses by 10-15% simply by tracking them — with no other changes.',
            steps: [
                {
                    title: 'The 30-Day Family Finance Tracker',
                    body: `**Your June Mission: Track every rupee your family spends for 30 days.**\n\nMost families have a rough sense of their income but no idea where most of their money actually goes. This exercise changes that — permanently.\n\n**Your Tracking System:**\nCreate a notebook (or Google Sheet) with this format:\n\n| Date | Description | Amount (₹) | Category | Need/Want |\n|---|---|---|---|---|\n| June 1 | Vegetables from sabziwala | 180 | Groceries | Need |\n| June 1 | Swiggy dinner | 650 | Food Delivery | Want |\n| June 2 | School bus fee | 1,200 | Transport | Need |\n| June 3 | Movie tickets | 800 | Entertainment | Want |\n\n**Categories to Track:**\n- Groceries & home food\n- Food delivery & restaurants\n- Transport (petrol, auto, bus)\n- Utilities (electricity, water, internet)\n- School / education\n- Entertainment & OTT\n- Shopping & clothing\n- Medical\n- Savings transferred out\n\n**Weekly Check-ins (Every Sunday):**\n1. Total spending so far this month: ₹ ?\n2. Biggest single category: ?\n3. Most surprising "want" you didn't realize you spent on: ?\n4. Is the family on track to hit the 20% savings target?\n\n**What Most Families Discover in Week 1:**\n- Food delivery is 2-3x what was estimated (₹500 "here and there" becomes ₹6,000/month)\n- Multiple forgotten auto-payments draining the account (apps, subscriptions, insurance)\n- "Small" daily cash expenses (chai, parking, snacks) add to ₹2,000-₹3,000/month\n\nBy the end of June, you will have the most powerful asset in personal finance: **real data about your family's spending patterns.**`,
                    activity: `🏠 HOME ACTIVITY: Set up the tracker TODAY with your parent's help. Use a physical notebook if you prefer. Track every single transaction — even ₹5 paan or ₹20 chai. The goal is completeness, not perfection. At the end of June, calculate: Total Needs, Total Wants, Total Saved. What was the biggest surprise? Present your findings to your parent as a "Finance Report."`,
                },
                {
                    title: 'Week 4 Reflection & July Planning',
                    body: `**Turning Your Tracking Data Into Action**\n\nBy end of June, you now have real, hard data. This is where most people stop — and miss the entire point. The data is only valuable if it changes behavior.\n\n**Your Analysis Framework:**\n\n**Step 1: Calculate the Percentages**\n- Total Needs spending ÷ Monthly Income = Needs %\n- Total Wants spending ÷ Monthly Income = Wants %\n- Total Savings ÷ Monthly Income = Savings %\n- Compare to 50/30/20 targets\n\n**Step 2: Find the Top 3 "Want Leaks"**\nWhich three Want categories consumed the most money? In most families, the top 3 culprits are:\n1. Food delivery / dining out\n2. Online shopping (Amazon, Flipkart — items bought impulsively)\n3. Entertainment subscriptions (multiple OTT + games)\n\n**Step 3: Calculate the Annual Impact**\nIf food delivery was ₹7,000/month more than estimated: ₹7,000 × 12 = ₹84,000/year unnecessarily spent on Wants.\nIf invested at 12% compound for 10 years: ₹84,000/year SIP → approximately ₹19.7 Lakhs\n\n**Step 4: July Commitment**\nPick ONE specific change to implement in July. Make it measurable:\n- "We will reduce food delivery to maximum 4 orders per week (down from 9)" or\n- "We will cancel 2 unused OTT subscriptions (saves ₹600/month)"\n\n**The One-Change Philosophy:** You don't need to fix everything at once. One well-executed change, maintained consistently, creates more wealth than ten half-hearted changes that fade after a week.`,
                    activity: `🏠 HOME ACTIVITY: Create your family's "June Finance Scorecard" — a one-page summary with three sections: (1) How We Did vs 50/30/20, (2) Top 3 Want Leaks, (3) Our One July Commitment. Stick it on the refrigerator as a visible reminder. In July, track whether the commitment is being kept.`,
                },
            ],
        },
        {
            month: 'July',
            topic: '☀️ Summer Activity — Savings Goal Sprint',
            type: 'Summer Activity',
            status: 'locked',
            proTip: 'A goal with a deadline and a number is not a wish — it is a plan. Set your specific savings goal this week.',
            steps: [
                {
                    title: 'The July Savings Goal Sprint',
                    body: `**The Power of Goal-Based Saving**\n\nResearch in behavioral economics shows that people save dramatically more when they are saving FOR something specific rather than "saving in general." A clearly defined goal creates motivation that generic saving instructions cannot.\n\n**The Goal-Based Saving Framework:**\n\n**Step 1: Choose Your Goal**\nPick one specific, meaningful financial goal you want to achieve in the next 3-12 months. Examples for Class 8 students:\n- A specific book / course / instrument you genuinely want\n- A mid-range item (₹2,000-₹10,000) you've been wanting\n- Your personal contribution to a family goal\n- Donating to a cause you care about\n\n**Step 2: Research the Goal Precisely**\n- Exact price (check 3 sources: Amazon, local shop, second-hand marketplace)\n- Can a refurbished version provide 80% of the value at 60% of the cost?\n- Is there a better alternative you haven't considered?\n- What is the REAL reason you want this? (Genuine desire vs. social pressure)\n\n**Step 3: Calculate Your Monthly Saving Target**\nFormula: Monthly Target = Goal Amount ÷ Months Available\n\nExample: ₹4,500 goal in 6 months → ₹4,500 ÷ 6 = **₹750/month**\n\n**Step 4: Identify the Source**\nWhere will the ₹750/month come from in your budget?\n- From existing pocket money (which bucket — wants?)\n- From a small side activity (helping with home chores for extra allowance)\n- From reducing one specific Want (cut 4 bubble teas → saves ₹400; ask for ₹350 increase in allowance)\n\n**Step 5: Create a Visual Tracker**\nDraw a progress bar or thermometer. Color it in each week as you deposit toward your goal. Visualization dramatically increases follow-through.\n\n**Why This Process Matters Beyond the Goal:**\nThe skill you're building is not about the specific item you save for. You are building the neurological habit of:\n1. Identifying a goal → 2. Calculating what's needed → 3. Finding the money → 4. Executing consistently → 5. Achieving it and feeling the reward\n\nThis loop, once formed, applies to a car, a home down payment, retirement savings — the scale changes, the loop remains identical.`,
                    activity: `Set your July Savings Goal today. Write it down: "My goal is [ITEM]. It costs ₹[AMOUNT]. I want it by [DATE]. I need to save ₹[MONTHLY AMOUNT] for [MONTHS] months. I will save this by [SPECIFIC SOURCE]." Share this with your parent. Ask them to hold you accountable.`,
                },
                {
                    title: 'Sprint Reflection — Did You Hit Your Goal?',
                    body: `**The July Debrief: Learning From Your First Savings Sprint**\n\nBy end of July, evaluate your savings sprint honestly. There is no "failure" here — only data and learning.\n\n**Questions to Answer:**\n\n1. **Did you hit your monthly savings target?**\n   - If YES: Celebrate. What worked? Can this habit continue into August?\n   - If NO: What specifically caused the shortfall? Was the target realistic? What got in the way?\n\n2. **Did your goal change?**\n   - Sometimes, researching a goal deeply makes you realize you don't want it as much as you thought. That's valuable insight — not a failure.\n   - If the goal changed, why? Was it social pressure (wanting something because friends have it) or genuine desire?\n\n3. **What surprised you?**\n   - Most students discover they can save more than they thought if they simply choose to\n   - Or discover specific temptations that derail them (the 'just this once' snack, the impulsive app purchase)\n\n**The Bigger Picture:**\nThe goal item you saved for matters less than what you've learned about yourself as a saver. Financial independence is built by thousands of these small cycles — setting a goal, making a plan, executing, reflecting, improving.\n\n**Connecting to Your Family Budget:**\nShare your July spending and savings data with your parent. Compare your personal savings rate for July with what you calculated for the family in June. Are your personal habits better or worse than the family average? What's one thing you're doing better than the family pattern? One thing worse?\n\n**Looking Ahead to August:**\nIn August, you'll study Credit, Loans, and EMIs — the most dangerous financial product most Indians encounter without adequate preparation. The savings discipline you've built in June-July is the exact antidote to debt traps.`,
                    activity: `🏠 HOME ACTIVITY: Create a "July Savings Sprint Report." Include: (1) Your goal and target amount, (2) What you actually saved, (3) Achievement percentage, (4) Biggest lesson learned, (5) Your one commitment for August. Present this verbally to your parent. Ask: "What was your biggest savings challenge at my age?" Their answer will surprise you.`,
                },
            ],
        },
        {
            month: 'August',
            topic: 'Credit, Loans & EMIs — The Double-Edged Sword',
            type: 'Theory',
            status: 'current',
            proTip: 'Debt used wisely builds assets. Debt used unwisely destroys wealth at 36% annually. Know the difference before you borrow a single rupee.',
            steps: [
                {
                    title: 'Understanding Credit — The Good, the Bad, and the Ugly',
                    story: `Vikram's uncle bought a ₹70 Lakh apartment in Bengaluru in 2015 using a home loan at 9% interest. Today, that apartment is worth ₹1.35 Crore. His debt "cost" him 9% per year, but his asset grew at 12% per year. The debt made him richer. His neighbor borrowed ₹2 Lakhs on a credit card at 3.5%/month to fund a vacation. Three years later, despite making regular minimum payments, the balance had grown to ₹3.1 Lakhs. The vacation was forgotten, but the debt wasn't. The same financial product — borrowing money — created wealth in one case and destroyed it in the other. The difference was not luck. It was the interest rate and the purpose.`,
                    body: `**The Debt Spectrum — From Wealth-Building to Wealth-Destroying**\n\n**Category 1: PRODUCTIVE DEBT (Asset rate > Debt rate)**\nBorrowing to buy something that grows faster than the loan's interest.\n\n| Loan Type | Interest Rate | Asset Growth | Net Effect |\n|---|---|---|---|\n| Home Loan | 8.5-9.5% | 10-13%/yr | ✅ Wealth-creating |\n| Education Loan (IIT/Medicine) | 8-10% | 200-400% income boost | ✅ Highly positive ROI |\n| Business Loan (good business) | 12-14% | 20-30% return | ✅ Positive spread |\n\n**Category 2: NEUTRAL DEBT (Necessary but careful)**\n| Loan Type | Interest Rate | What You Get | Net Effect |\n|---|---|---|---|\n| Car Loan | 9-11% | Transport (depreciates) | ⚠️ Manageable if short tenure |\n\n**Category 3: DESTRUCTIVE DEBT (Rate destroys all investment returns)**\n| Loan Type | Interest Rate | Truth | Net Effect |\n|---|---|---|---|\n| Credit Card revolving | 36-42%/yr | No investment returns 36%+ consistently | ❌ Guaranteed wealth destruction |\n| Personal Loan (consumption) | 14-24%/yr | Funds experiences that depreciate to zero | ❌ Costly |\n| BNPL / Buy Now Pay Later | 24-60%/yr | Hidden charges, debt trap for many users | ❌ Very dangerous |\n| Payday Loans | 100-600%/yr (effective) | Predatory lending targeting desperate borrowers | ❌ Catastrophic |\n\n**The Golden Rule of Borrowing:**\n> "Only borrow for assets that are likely to grow faster than the interest rate you pay."\n\nA home loan at 9% for a property that grows 11% = positive real outcome.\nA credit card at 36% for a vacation that depreciates to 0% = guaranteed impoverishment.\n\n**India's Household Debt Situation:**\nRBI data shows India's household debt-to-GDP ratio has risen to approximately 37% (2024). Personal loans and credit card debt are growing fastest — often funding consumption (phones, vacations) rather than assets.`,
                    funFact: `If you borrow ₹50,000 on a credit card at 3.5%/month and make only minimum payments, the "compounding" works violently against you: after 5 years of minimum payments, you may have paid ₹75,000 in interest — 1.5x the original amount — and STILL owe close to ₹30,000 on the original ₹50,000. This is why credit card companies are among the most profitable businesses in the world.`,
                },
                {
                    title: 'How EMIs Work — The Mathematics of Loan Repayment',
                    body: `**EMI (Equated Monthly Installment)** is a fixed monthly payment that combines both interest and principal repayment, calculated so the loan is fully paid off at the end of the tenure.\n\n**The EMI Formula:**\nEMI = [P × r × (1+r)^n] ÷ [(1+r)^n - 1]\n\nWhere:\n- P = Principal loan amount\n- r = Monthly interest rate (Annual Rate ÷ 12)\n- n = Number of months (tenure)\n\n**Real Example — A ₹5 Lakh Car Loan at 9.5% for 5 Years:**\n- P = ₹5,00,000\n- r = 9.5% ÷ 12 = 0.792% per month\n- n = 60 months\n- **EMI ≈ ₹10,519/month**\n- Total paid = ₹10,519 × 60 = ₹6,31,140\n- **Total interest paid = ₹1,31,140 (26.2% of the original loan!)**\n\n**The Amortization Secret — What Banks Don't Advertise:**\nIn an EMI, early payments are almost entirely INTEREST. Late payments are almost entirely PRINCIPAL.\n\n| Month | EMI | Interest Component | Principal Component | Balance Remaining |\n|---|---|---|---|---|\n| 1 | ₹10,519 | ₹3,958 | ₹6,561 | ₹4,93,439 |\n| 12 | ₹10,519 | ₹3,429 | ₹7,090 | ₹4,29,476 |\n| 30 | ₹10,519 | ₹2,485 | ₹8,034 | ₹3,11,031 |\n| 55 | ₹10,519 | ₹414 | ₹10,105 | ₹41,836 |\n| 60 | ₹10,519 | ₹83 | ₹10,436 | ₹0 |\n\n**Key insight:** In Month 1, nearly 40% of your EMI is pure interest. Only after 30+ months does the principal repayment truly accelerate. This is why **prepaying loans early is so mathematically powerful** — every early prepayment eliminates future interest on that principal.\n\n**EMI-to-Income Ratio:**\nFinancial planners recommend that your TOTAL monthly EMIs should not exceed **40% of your take-home monthly income.**\nIf combined income = ₹1 Lakh/month → Maximum EMIs = ₹40,000/month\nExceeding this creates cash flow stress and leaves no room for savings.`,
                    activity: `EMI Calculator Challenge: Use the free EMI calculator on BankBazaar.in. Calculate the total interest paid on:\n(A) ₹10 Lakh home loan at 8.5% for 20 years\n(B) ₹10 Lakh home loan at 8.5% for 10 years\nWhat is the difference in total interest between the 20-year and 10-year tenure? This shows why paying off loans faster saves enormous amounts.`,
                },
                {
                    title: 'Credit Cards — Power Tool or Debt Trap?',
                    body: `**The Credit Card: India's Most Misunderstood Financial Product**\n\nUsed correctly, a credit card is an interest-free 30-45 day loan that also gives cashback, rewards, and builds your credit score. Used incorrectly, it is a 36-42% annual interest debt trap that destroys savings.\n\n**How a Credit Card Actually Works:**\n1. You buy ₹10,000 of goods today. The bank pays the merchant.\n2. You have approximately 20-50 days (depending on statement cycle) to repay the bank.\n3. If you repay 100% of the statement balance by due date: **Zero interest charged.** Effectively a free loan.\n4. If you pay only the "Minimum Due" (usually 5% of balance): The remaining balance attracts **3-3.5% monthly interest (36-42% annual)** from the transaction date.\n\n**The "Minimum Payment" Trap:**\n₹1 Lakh credit card balance, 3.5%/month, minimum payment ₹5,000:\n- Month 1: Balance ₹1,00,000. Interest = ₹3,500. You pay ₹5,000. New balance = ₹98,500.\n- Month 2: Balance ₹98,500. Interest = ₹3,448. You pay ₹5,000. New balance = ₹96,948.\n- ...\n- Month 36: You've paid approximately ₹1,80,000 total and STILL owe ₹68,000!\n\n**The Safe Credit Card Rules:**\n1. **Full Payment Rule:** Pay 100% of the statement balance EVERY month — no exceptions\n2. **30% Utilization Rule:** Never use more than 30% of your credit limit in a billing cycle\n3. **One Card Rule:** Start with one card, master the discipline, then expand\n4. **No EMI on credit card for consumption** (phone, clothes) — this locks in the high interest cost\n\n**Building Credit Score from Age 18:**\n- Get a secured credit card (FD of ₹15,000-₹25,000 as collateral)\n- Use ₹2,000-₹3,000 per month (groceries, petrol)\n- Pay 100% balance every month\n- After 12 months: CIBIL score will be ~700+, unlocking better loan rates for life\n\n**Credit Score Impact on Loans:**\n| CIBIL Score | Home Loan Rate | On ₹50L, 20 years — Extra Interest |\n|---|---|---|\n| 780+ (Excellent) | 8.5% | Base |\n| 700-749 (Good) | 8.9% | +₹3.5 Lakhs extra |\n| 650-699 (Fair) | 10% | +₹14 Lakhs extra |\n| Below 650 (Poor) | Loan rejected or 12%+ | +₹30+ Lakhs extra |\n\nA good CIBIL score built carefully from age 18 is worth lakhs of rupees in lower interest costs over your lifetime.`,
                    activity: `🏠 HOME ACTIVITY: Check your family's credit card statement (with parent's permission). Identify: (1) Statement balance, (2) Minimum due vs. full balance, (3) Credit utilization rate (balance ÷ credit limit), (4) Any EMI commitments on the card. Discuss: Is the family using the credit card as a free tool or paying interest? If paying interest, calculate the annual interest cost and compare it to the family's annual savings.`,
                },
            ],
            unitTest: [
                {
                    q: 'Which type of debt is most likely to BUILD wealth over time?',
                    options: ['Credit card debt at 36% interest to buy a new phone', 'Personal loan at 18% for a vacation', 'Home loan at 8.5% for a property appreciating at 11%/year', 'BNPL at 48% for festival shopping'],
                    correct: 2,
                    explanation: 'Productive debt has an interest rate LOWER than the growth rate of the asset purchased. A home loan at 8.5% for a property growing at 11% creates a positive spread of 2.5% — the debt is effectively making you richer. Credit card debt at 36% finances depreciating consumption — there is no asset growing faster than 36% to offset the cost.',
                },
                {
                    q: 'In early EMI payments, the majority of each payment goes toward:',
                    options: ['Reducing the principal', 'Paying the bank\'s processing fees', 'Paying interest on the outstanding balance', 'Building your credit score'],
                    correct: 2,
                    explanation: 'EMI is structured so that early payments are predominantly interest, with very little principal reduction. On a ₹5 Lakh loan at 9.5%, Month 1\'s EMI of ₹10,519 contains ₹3,958 interest and only ₹6,561 principal. This is why long-tenure loans are so expensive — you pay years of interest before meaningfully reducing what you owe.',
                },
                {
                    q: 'A person with ₹50,000 credit card debt at 3.5%/month pays only the minimum due of ₹2,500. What happens over the next year?',
                    options: ['The debt reduces steadily to near zero', 'The debt barely reduces and total interest paid exceeds ₹18,000', 'The credit card company forgives the rest', 'The interest rate drops to 1% for loyal customers'],
                    correct: 1,
                    explanation: '3.5%/month × ₹50,000 = ₹1,750 interest in Month 1 alone. Paying ₹2,500 minimum leaves only ₹750 of actual principal reduction. The balance barely moves: after 12 minimum payments (₹30,000 paid), you still owe roughly ₹42,000-₹44,000. Total interest paid year 1: approximately ₹20,000. The credit card trap is not about bad luck — it is the mathematical inevitability of compound interest working against you at 42% annually.',
                },
                {
                    q: 'What does it mean when a financial planner says your "EMI-to-income ratio" should stay below 40%?',
                    options: ['You should save 40% of income for EMIs', 'Total monthly EMI payments should not exceed 40% of take-home monthly pay, to preserve cash flow for savings and expenses', 'Your income must be 40% higher than your EMIs', 'You can only take loans up to 40 months tenure'],
                    correct: 1,
                    explanation: 'If your take-home pay is ₹60,000/month, total EMIs (home loan + car loan + personal loan) should not exceed ₹24,000/month. Exceeding 40% creates cash flow stress — any unexpected expense forces borrowing at higher rates, starting a debt spiral. Below 40%, there is room for savings and emergency expenses without crisis.',
                },
                {
                    q: 'The safest way to use a credit card (making it effectively free and wealth-building) is:',
                    options: ['Paying only the minimum due each month', 'Using it for all expenses to maximize reward points, regardless of balance', 'Paying 100% of the statement balance every due date with utilization below 30%', 'Closing it immediately after getting it to avoid temptation'],
                    correct: 2,
                    explanation: 'A credit card used correctly is a 30-45 day interest-free loan that builds your CIBIL score and earns reward points/cashback. The key: pay the FULL statement balance (not just minimum) by due date every month — this incurs zero interest. Keep utilization below 30% of your credit limit. This disciplines your spending while building the credit history that will lower your future loan interest rates.',
                },
            ],
        },
        {
            month: 'September',
            topic: 'Unit Test — Banking, Budgets & Credit',
            type: 'Unit Test',
            status: 'locked',
            proTip: 'The three modules you\'ve studied — budgeting, banking, and credit — form the entire foundation of personal financial stability. Master these and you will never face a financial emergency unprepared.',
            steps: [
                {
                    title: 'Unit Test Review — Banking, Budgets & Credit',
                    body: `**Class 8 Module 1-3 Summary:**\n\n**The 50/30/20 Budget Rule:**\n- 50% Needs | 30% Wants | 20% Savings (paid first)\n- Track expenses to find leaks\n- Automate savings to remove temptation\n- Emergency Fund = 3-6 months of essential expenses\n\n**Banking Products:**\n- Banks earn Net Interest Margin (NIM) = Lending rate minus deposit rate\n- FDs: Capital safe, fully taxable, barely beats inflation post-tax\n- RDs: Monthly FD equivalent, good for systematic Emergency Fund building\n- DICGC insures ₹5 Lakhs per depositor per bank\n\n**Credit, Loans & EMIs:**\n- Productive debt: interest rate < asset growth rate (home loan, education)\n- Destructive debt: credit card 36-42%/year, BNPL, personal loans for consumption\n- EMI = fixed monthly payment; early payments mostly interest\n- EMI-to-income ratio: keep below 40%\n- CIBIL score: 750+ unlocks best rates; poor score costs lakhs in extra interest\n- Credit card used correctly: free 30-45 day loan + credit building\n\n**The Big Picture:** A family that follows 50/30/20, keeps an Emergency Fund, avoids destructive debt, and builds a strong CIBIL score is statistically almost certain to build meaningful wealth over 20 years — regardless of income level.`,
                    activity: `🏠 PRE-TEST ACTIVITY: Without looking at your notes, answer these five questions out loud to your parent or a friend: (1) What is the 50/30/20 rule? (2) How does a bank make money from your savings account? (3) What is DICGC insurance and how much does it cover? (4) Why is credit card minimum payment so dangerous? (5) What CIBIL score should you aim for? If you can answer all five clearly, you are ready for the unit test.`,
                },
            ],
            unitTest: [
                {
                    q: 'A software engineer earns ₹1,20,000/month. Under the 50/30/20 rule, how much should go to savings?',
                    options: ['₹12,000', '₹24,000', '₹36,000', '₹60,000'],
                    correct: 1,
                    explanation: '20% of ₹1,20,000 = ₹24,000/month. If invested in an Index Fund at 12% CAGR for 20 years, this ₹24,000/month SIP grows to approximately ₹2.4 Crore. On a ₹1.2 Lakh/month salary, this requires controlling Wants (₹36,000) and Needs (₹60,000) — challenging but achievable if lifestyle creep is resisted.',
                },
                {
                    q: 'Which of the following best describes "Lifestyle Creep"?',
                    options: ['Banks slowly increasing loan interest rates', 'Spending automatically expanding to consume income increases, leaving savings rate unchanged', 'Prices rising due to inflation', 'The gradual increase in a credit card\'s interest rate'],
                    correct: 1,
                    explanation: 'Lifestyle Creep is the universal enemy of wealth building. When a salary rises from ₹50K to ₹80K, the extra ₹30K is absorbed by upgraded housing, a better car, more dining out — leaving savings at the same absolute amount or even the same percentage. Only a deliberate budget with Savings automated first prevents Lifestyle Creep from consuming every salary increase.',
                },
                {
                    q: 'Your family\'s monthly essential expenses are ₹40,000. How large should the 6-month Emergency Fund be?',
                    options: ['₹40,000', '₹1,20,000', '₹2,40,000', '₹4,80,000'],
                    correct: 2,
                    explanation: '6 months × ₹40,000/month = ₹2,40,000. This should be kept in a Liquid Mutual Fund or high-yield savings account — accessible within 1 business day — NOT in equity funds (which can fall 40% exactly when you have an emergency) or locked FDs (penalty for early withdrawal).',
                },
                {
                    q: 'Between a home loan at 8.5% and a credit card balance at 36%, which should be repaid first with any surplus money?',
                    options: ['Home loan — larger total amount', 'Credit card — higher interest rate makes it more mathematically urgent to eliminate', 'Both equally', 'Neither — invest any surplus in equity for higher returns'],
                    correct: 1,
                    explanation: 'The "Debt Avalanche" method: always direct surplus to the HIGHEST interest rate debt first. At 36%, credit card debt doubles in 2 years. At 8.5%, home loan debt is manageable and the property is appreciating. No equity investment reliably returns 36% annually to justify carrying credit card debt. Eliminate the 36% debt first, then optimise everything else.',
                },
                {
                    q: 'Which scenario results in zero credit card interest being charged?',
                    options: ['Paying the minimum due (5% of balance) by due date', 'Paying any amount before the next statement date', 'Paying 100% of the statement balance by the payment due date every month', 'Keeping utilization below 30% of the credit limit'],
                    correct: 2,
                    explanation: 'Interest-free credit card usage requires paying the COMPLETE statement balance (not just minimum, not partial) by the due date. When you do this, the bank has effectively given you a 30-45 day interest-free loan every month. The minimum payment option is a trap — it makes you feel you\'ve complied while triggering the 36%+ interest on the remaining balance from the transaction date.',
                },
            ],
        },
        {
            month: 'October',
            topic: 'Insurance — Protecting What You Build',
            type: 'Theory',
            status: 'locked',
            proTip: 'Insurance is not an investment — it is the foundation that protects every investment you make. Never confuse the two.',
            steps: [
                {
                    title: 'Why Insurance Exists — The Logic of Risk Pooling',
                    story: `In 1666, the Great Fire of London destroyed 13,200 houses. Most owners lost everything overnight with no way to recover. In response, Edward Lloyd's coffee shop in London became a meeting point for merchants who wanted to share risk. If 1,000 merchants each paid a small amount into a pool, and one suffered a catastrophic loss, the pool could compensate them. No single merchant could survive a catastrophic loss alone, but together they could all survive. This became Lloyd's of London — and the fundamental logic of ALL insurance. India's modern insurance sector, regulated by IRDAI (Insurance Regulatory and Development Authority of India), now manages over ₹60 Lakh Crore in policies.`,
                    body: `**Insurance — The Foundation of Wealth Protection**\n\n**What is Insurance?**\nInsurance is a contract where you pay a regular small premium to a company. In exchange, the company promises to cover a specific large financial loss if a defined event occurs.\n\n**The Fundamental Principle: Risk Pooling**\nNo individual can predict whether they will have a car accident, heart attack, or house fire. But across a large enough group, the percentage of people who will face each event is highly predictable. Insurance companies use this statistical predictability to:\n1. Collect small premiums from millions of policyholders\n2. Pay out large claims to the small percentage who suffer losses\n3. Keep a margin as profit while providing certainty to all members\n\n**Why Insurance is Essential Before Any Investment:**\nImagine building ₹15 Lakhs in savings over 10 years. Then:\n- A heart attack requires ₹8 Lakh surgery\n- Your uninsured car hits another vehicle (liability: ₹5 Lakhs)\n- Your home floods and damages your furniture (₹3 Lakhs)\n\nIn each case, **one uninsured event can wipe out years of savings.** Insurance doesn't make you wealthy — it prevents you from becoming un-wealthy.\n\n**India's Insurance Landscape (2024):**\n- Life insurance: ₹58 Lakh Crore total sum assured; LIC is largest insurer\n- Health insurance: Only 37% of Indians have any health coverage — one of the lowest globally\n- IRDAI: The regulator ensuring insurers pay valid claims and maintain solvency\n\n**The Insurance Priority Order:**\n1. Term Life Insurance (if anyone depends on your income)\n2. Health Insurance (for every family member)\n3. Motor Insurance (legally mandatory for vehicles)\n4. Home Insurance (for property owners)\n5. Critical Illness Cover (for high-risk conditions)`,
                    funFact: `India's out-of-pocket healthcare spending is approximately 50% of total health expenditure — meaning half of all medical costs are paid directly from family savings or loans. This is why medical emergencies are the #1 cause of household financial distress in India, pushing an estimated 55-60 million Indians into poverty annually.`,
                },
                {
                    title: 'Types of Insurance — What You Need vs. What You Don\'t',
                    body: `**The Critical Distinction: Pure Protection vs. Investment + Insurance**\n\n**Term Life Insurance — The ONLY Life Insurance Most People Need:**\n- Pure protection: You pay a premium. If you die during the policy term, your nominee gets the Sum Assured.\n- If you survive the term: You get NOTHING. This is called a "pure risk" product.\n- WHY IT'S SUPERIOR: A ₹1 Crore Term policy for a 30-year-old costs approximately ₹8,000-₹12,000/year — incredibly affordable.\n- The "lost" premium if you survive: Think of it as renting a financial safety net for your family.\n\n**Endowment / Whole Life / Money Back — AVOID for most people:**\n- These mix insurance + savings/investment\n- A ₹1 Crore cover via endowment plan might cost ₹1,20,000+/year — 10-15x more expensive\n- The "investment" portion returns 4-6% — BELOW inflation post-tax\n- LIC's traditional policies have returned approximately 5.5-6% historically — far below 12% index funds\n- Financial advisors universally recommend: **"Buy term, invest the rest"**\n\n**ULIPs (Unit Linked Insurance Plans) — Handle with care:**\n- Insurance + equity mutual fund combined\n- Heavy charges in the first 5 years (allocation charges, mortality, fund management) eat 3-5% annually\n- After a 5-year lock-in, returns can be decent but rarely better than pure index funds\n\n**Health Insurance — Non-Negotiable for Every Family:**\n- Covers hospitalization expenses: surgery, ICU, doctor fees, medicines during admission\n- Individual cover: ₹5-10 Lakh recommended minimum per person\n- Family Floater: One policy covers all family members (any one claim draws from the pool)\n- Premium: ₹15,000-₹30,000/year for a family of 4 (₹10 Lakh cover) — incredibly cheap vs. one hospitalization\n\n**Motor Insurance — Legally Mandatory:**\n- Third-party insurance: legally required by Motor Vehicles Act for all vehicles\n- Comprehensive insurance: also covers your own vehicle damage\n- Tip: Do NOT claim for small dents/scratches — preserve your No-Claim Bonus (NCB) for large accidents\n\n**Home Insurance — Severely Underused in India:**\n- Covers fire, flood, theft, natural disasters\n- A ₹50 Lakh home can be insured for approximately ₹3,000-₹5,000/year — extraordinarily affordable\n- Only ~3% of Indian homes are insured — this is a major financial blindspot`,
                    activity: `Insurance Gap Analysis: Ask your parent: (1) Do we have Term Life Insurance? For how much? (2) Do we have a Family Floater Health Insurance? What is the cover amount? (3) Is our car insured — Third-party only or Comprehensive? (4) Is our home insured? For most families, the answer to #1-4 will reveal significant gaps. Calculate: what would happen to the family financially if any one of these uninsured risks occurred tomorrow?`,
                },
                {
                    title: 'How to Evaluate an Insurance Policy — Reading the Fine Print',
                    body: `**What to Look for When Buying Insurance**\n\nMost people buy insurance based on the premium quote alone. This is like choosing a restaurant by the size of the menu — the details matter far more than the headline.\n\n**Key Terms in Any Insurance Policy:**\n\n**Sum Assured / Sum Insured:** The maximum amount the insurer will pay. For life insurance, this should be at minimum **10-15x annual income** for the primary earner's dependents to maintain their lifestyle.\n\n**Premium:** The annual (or monthly) cost. For term life, a healthy 30-year-old should pay ₹8,000-₹14,000/year for ₹1 Crore cover.\n\n**Exclusions:** Events or conditions NOT covered. Common exclusions:\n- Pre-existing medical conditions (usually covered after 2-4 year waiting period)\n- Self-inflicted injuries\n- Claims from war or nuclear events\n- In health insurance: specific diseases with waiting periods\n- READ THE EXCLUSIONS before signing — this is where most claim disputes originate\n\n**Claim Settlement Ratio (CSR):** The percentage of claims an insurer paid out in the previous year.\n- Above 98%: Excellent (LIC: 98.5%, HDFC Life: 99.5%)\n- Below 90%: Red flag — avoid this insurer\n- Check the IRDAI website for published annual CSRs\n\n**The ₹80D Tax Benefit:**\nHealth insurance premiums are tax-deductible under Section 80D:\n- Self + family: up to ₹25,000 deduction\n- Parents (senior citizens): up to ₹50,000 additional deduction\n- Maximum total: ₹75,000 if parents are senior citizens\n\n**IRDAI Grievance Redressal:**\nIf an insurer wrongly rejects your claim, you can escalate to:\n1. Insurer's Internal Grievance Cell (15-day resolution mandatory)\n2. Insurance Ombudsman (free service, binding orders up to ₹30 Lakhs)\n3. IRDAI Bima Bharosa portal (online grievance filing)\n\n**Practical Insurance Checklist for a Middle-Class Family:**\n| Insurance Type | Recommended Cover | Annual Premium (Approx.) |\n|---|---|---|\n| Term Life (30-year-old, ₹1 Cr) | ₹1 Crore | ₹10,000-₹14,000 |\n| Family Floater Health (₹10L) | ₹10 Lakh | ₹20,000-₹30,000 |\n| Car (Comprehensive) | IDV of vehicle | ₹8,000-₹20,000 |\n| Home Insurance | Rebuilding cost | ₹3,000-₹6,000 |\n| **Total Protection Budget** | | **~₹45,000-₹70,000/year** |`,
                    activity: `🏠 HOME ACTIVITY: Find your family's Term Life insurance policy (or ask your parent to show you). Identify: (1) Sum Assured amount, (2) Policy term (end year), (3) Annual premium, (4) Claim Settlement Ratio of the insurer (look up on IRDAI website). Is the Sum Assured adequate (10x+ annual income)? If not, discuss with your parent why upgrading might be important.`,
                },
            ],
            unitTest: [
                {
                    q: 'What is the fundamental principle behind insurance?',
                    options: ['Investing premium payments in the stock market for policyholders', 'Pooling small regular premiums from many people to cover large losses suffered by a few', 'Banks lending money to cover emergencies', 'Government subsidizing healthcare for poor families'],
                    correct: 1,
                    explanation: 'Insurance works through risk pooling: thousands of policyholders pay small premiums into a collective pool. Statistically, only a small percentage will make claims. The pool compensates those who suffer losses. No individual can self-insure against a ₹50 Lakh medical bill, but ₹10,000/year pooled across 5,000 policyholders easily covers such events for the few who experience them.',
                },
                {
                    q: 'Why do financial advisors recommend "Buy Term, Invest the Rest" over endowment or money-back policies?',
                    options: ['Term policies have better cashback rewards', 'Term provides pure large coverage at low cost; investing the premium difference in equity generates far more wealth than the "savings" component of traditional plans', 'Endowment policies are illegal in India', 'Term policies have shorter claim settlement times'],
                    correct: 1,
                    explanation: 'A ₹1 Crore term policy costs ₹10,000-₹14,000/year. An equivalent endowment policy might cost ₹1,20,000+/year. The ₹1,06,000 difference, invested in a NIFTY 50 Index Fund at 12% for 30 years, becomes approximately ₹3.2 Crore — far more than any endowment policy maturity value. Term + Index Fund is mathematically superior in almost every scenario.',
                },
                {
                    q: 'A family\'s health insurance Claim Settlement Ratio is 78%. What does this mean and should they be concerned?',
                    options: ['78% of claims are paid — this is excellent', '78% is below 90%, meaning 22% of valid claims are rejected — this insurer should be avoided', '78% is the return on premium invested', '78 claims were made in total this year'],
                    correct: 1,
                    explanation: 'Claim Settlement Ratio (CSR) is the percentage of claims paid by the insurer. An 88% CSR means 12 out of every 100 claims were rejected — this is dangerously low. IRDAI publishes annual CSRs. Top insurers (LIC, HDFC Life, Max Life) maintain 98-99%+ CSR. Always choose insurers with CSR above 95% — your premium is worthless if the claim gets rejected when you need it most.',
                },
                {
                    q: 'Under Section 80D, a person can claim deductions on health insurance premiums for:',
                    options: ['Only their own policy', 'Self, spouse, children, and parents — with higher limits for senior citizen parents', 'Only policies above ₹1 Lakh cover', 'Only government health schemes'],
                    correct: 1,
                    explanation: 'Section 80D allows: ₹25,000 deduction for premiums paid for self, spouse, and children; PLUS an additional ₹25,000-₹50,000 for parents (₹50,000 if parents are senior citizens). Maximum total deduction: ₹75,000 per year if parents are senior citizens. This effectively makes health insurance significantly cheaper — reducing the net cost by ₹5,000-₹22,500 depending on tax slab.',
                },
                {
                    q: 'If an insurance company wrongly rejects your valid claim, the CORRECT escalation path in India is:',
                    options: ['Post on social media and hope for viral attention', 'Directly file a criminal complaint against the insurer', 'Escalate to the Insurer\'s grievance cell → Insurance Ombudsman → IRDAI Bima Bharosa if unresolved', 'Pay a lawyer ₹2 Lakhs to file a consumer court case immediately'],
                    correct: 2,
                    explanation: 'IRDAI has established a free, efficient grievance system. The Insurer\'s internal grievance cell must respond within 15 days. If unresolved, the Insurance Ombudsman (free service) can issue binding orders up to ₹30 Lakhs. IRDAI\'s Bima Bharosa portal accepts online grievances directly. This system handles over 1.5 Lakh grievances annually and is designed to be accessible without legal fees.',
                },
            ],
        },
        {
            month: 'December',
            topic: 'Quest — 30-Day Budget Challenge',
            type: 'Quest',
            status: 'locked',
            proTip: 'One month of disciplined tracking changes your financial behavior permanently — the habit of awareness becomes automatic.',
            steps: [
                {
                    title: 'The 30-Day Full-Family Budget Challenge',
                    body: `**Your December Mission: Run the 50/30/20 Budget Perfectly for One Full Month**\n\nThis is not a tracking exercise — it is an execution exercise. You have studied the theory. Now live it.\n\n**Setup (Day 1):**\n1. Calculate your family's net monthly income (after taxes)\n2. Set the three budgets: Needs (50%), Wants (30%), Savings (20%)\n3. Transfer the Savings amount to a Liquid MF or RD on Day 1 itself — before any spending\n4. Create a tracking system: Google Sheet, Money Manager app, or notebook\n\n**Week 1 Goal:** Track every single transaction. No estimates. No rounding. Every ₹ matters.\n\n**Week 2 Check-in:** Review spending so far. Are you within the Needs and Wants budgets? If Needs are running high, what can shift? If Wants are over, which specific category is the culprit?\n\n**Week 3 Goal:** Identify ONE Want you can eliminate for the rest of the month and redirect to savings top-up.\n\n**Week 4 Evaluation:**\n- Did your Savings stay saved (not touched)?\n- What was the actual Needs %, Wants %, Savings %?\n- Compared to your first tracking exercise in June — did the numbers improve?\n\n**End-of-Month Deliverable:**\nA one-page "December Budget Report" with:\n- Planned vs. Actual for each category\n- Biggest success: what you controlled well\n- Biggest challenge: what was hardest to control\n- One behavioral change you will maintain in January\n\n**The Compound Effect of This Habit:**\nIf this challenge helps your family find and redirect ₹5,000/month from Wants to Savings: that's ₹60,000/year. At 12% compound return for 15 years: ₹30 Lakhs of additional wealth — from one month of focus that created a permanent habit.`,
                    activity: `🏠 HOME ACTIVITY: Complete all four weeks of the challenge. At the end of December, present your Budget Report to your parent formally — as if presenting to a bank for a loan review. Include: income, category-wise spending, savings rate achieved, and your plan for the next 3 months. This exercise is exactly how businesses present financial reports to management.`,
                },
            ],
        },
        {
            month: 'February',
            topic: '📝 Annual Exam — Personal Finance Mastery',
            type: 'Annual Exam',
            status: 'locked',
            proTip: 'If you can explain the 50/30/20 rule, how a bank makes money, why credit card interest is dangerous, and why insurance comes before investing — you have mastered Class 8 finance.',
            steps: [
                {
                    title: 'Class 8 Annual Exam — Review All Modules',
                    body: `**Class 8 Complete Review: The Five Pillars of Personal Finance**\n\n**Pillar 1: Budgeting with 50/30/20**\n- Pay yourself first (save before spending)\n- Track expenses to identify leaks\n- Automate savings via auto-debit SIP/RD\n- Lifestyle creep is the enemy of wealth building\n\n**Pillar 2: Banking Products**\n- Bank earns NIM (lending rate minus deposit rate)\n- FDs: safe, taxable, barely beats inflation post-tax\n- RDs: monthly FDs, ideal for Emergency Fund building\n- DICGC: ₹5 Lakh insurance per depositor per bank\n\n**Pillar 3: Credit, Loans & EMIs**\n- Productive debt: rate below asset growth (home loan, education)\n- Destructive debt: credit card 36-42%/year\n- EMI amortization: early payments mostly interest\n- CIBIL score 750+ saves lakhs in loan costs\n\n**Pillar 4: Insurance**\n- Term life: pure protection, 10-15x income coverage\n- Health: non-negotiable; out-of-pocket costs bankrupt families\n- Claim Settlement Ratio: check IRDAI data, choose >95%\n- Section 80D: health premium deduction up to ₹75,000\n\n**Pillar 5: The Emergency Fund**\n- 3-6 months of essential expenses\n- In Liquid MF or high-yield savings (never in equity)\n- Built BEFORE any investment begins\n- Only for genuine emergencies — not wants\n\n**The Class 8 Graduate's Competitive Edge:**\nYou now understand how a bank makes money from your deposits, why credit cards can be either free tools or debt traps, how insurance premiums protect your accumulated savings, and how the 50/30/20 rule creates a mathematical path to wealth on any income. Most working adults in India do not have this knowledge. You do.`,
                    activity: `🏠 PRE-EXAM ACTIVITY: Without looking at notes, write down answers to these five questions: (1) What is the 50/30/20 rule and which bucket is funded first? (2) How does a bank profit from your ₹1 Lakh savings deposit? (3) What is the effective annual interest rate on credit card revolving debt? (4) Why should insurance be purchased BEFORE investing? (5) Where should an Emergency Fund be kept and why NOT in equity funds? If you can answer all five accurately, you have achieved true Class 8 financial literacy.`,
                },
            ],
            unitTest: [
                {
                    q: 'Under the 50/30/20 rule on a ₹50,000/month income, how much should be saved monthly?',
                    options: ['₹5,000', '₹10,000', '₹15,000', '₹25,000'],
                    correct: 1,
                    explanation: '20% of ₹50,000 = ₹10,000/month. Over 25 years at 12% CAGR, this ₹10,000/month SIP builds approximately ₹1.9 Crore. The critical addition: this ₹10,000 must be auto-debited on salary day BEFORE any spending. The Savings bucket is not what remains — it is the first obligation.',
                },
                {
                    q: 'A Fixed Deposit earns 7.5% interest. The depositor is in the 30% tax bracket and inflation is 6%. What is the real post-tax return?',
                    options: ['+7.5%', '+1.5%', '-0.75%', '+5.25%'],
                    correct: 2,
                    explanation: 'Post-tax return = 7.5% × (1 - 0.30) = 5.25%. Real post-tax return = 5.25% - 6% (inflation) = -0.75%. Despite "earning" interest, this person is losing 0.75% of purchasing power annually. FDs are not wealth-building tools for taxpayers in the 20-30% bracket when inflation is running above 5.5%.',
                },
                {
                    q: 'Why is the "minimum payment" on a credit card called a financial trap?',
                    options: ['Banks charge an extra fee for minimum payments', 'Minimum payments eliminate only a tiny fraction of principal while 36%+ interest compounds on the remaining balance — the debt grows faster than it shrinks', 'Minimum payments are illegal above ₹50,000', 'Banks cannot sue you if you always pay the minimum'],
                    correct: 1,
                    explanation: 'On ₹1 Lakh credit card debt at 3.5%/month, monthly interest = ₹3,500. A minimum payment of ₹5,000 repays only ₹1,500 of principal. The balance barely moves. Over 5 years of minimum payments, total amount paid can exceed ₹3 Lakhs — and you may still owe ₹50,000+. The minimum payment is designed to maximize bank profit while keeping you permanently indebted.',
                },
                {
                    q: 'What does a Claim Settlement Ratio of 99% mean for an insurance company?',
                    options: ['99% of policyholders renewed their policies', '99% of insurance claims submitted were paid out — indicating high reliability', '99% of the premium is invested for the policyholder', 'The insurer rejected 99% of applicants'],
                    correct: 1,
                    explanation: 'CSR of 99% means 99 out of every 100 valid claims were paid. This is excellent — it indicates the insurer honors its obligations reliably. IRDAI publishes annual CSRs for all insurers. Always check CSR before buying insurance. An insurer with 80% CSR means 20% of claims are rejected — making those premiums potentially worthless when you need protection most.',
                },
                {
                    q: 'The correct order of financial priorities (from first to last) is:',
                    options: ['Invest in stocks → Build emergency fund → Get insurance → Budget', 'Budget → Emergency Fund → Insurance → Invest for growth', 'Get all credit cards → Invest aggressively → Budget if time allows', 'Invest first for compound growth → Insurance later when older'],
                    correct: 1,
                    explanation: 'The correct financial foundation sequence: (1) Budget (50/30/20) to create surplus; (2) Emergency Fund (3-6 months expenses in Liquid MF) — because investing without a cushion means selling investments in crises; (3) Insurance (term + health) — because one medical event without coverage destroys all investments; (4) Then invest for long-term growth. Skipping steps 1-3 to jump to investing is building on sand.',
                },
            ],
        },
    ],
};
