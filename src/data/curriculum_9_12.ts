import type { GradeSyllabus } from './curriculumTypes';

const IMG = '/Users/rewatiraman/.gemini/antigravity/brain/d5efc5fd-3de4-4644-91a8-f6bdde6c9a81';

export const syllabus9_12: Record<number, GradeSyllabus> = {

    9: {
        grade: 9, bookTitle: 'The Market Expert', subtitle: 'Stock Markets & Investing', theme: 'market',
        complexityNote: 'Institutional finance. Market mechanics. P/E ratios. SIP math.',
        modules: [
            {
                month: 'April', topic: 'The Stock Market: Ownership, BSE & NSE', type: 'Theory',
                status: 'passed', score: 72,
                proTip: 'Investing in equity is not gambling — speculation without research is gambling.',
                steps: [
                    {
                        title: 'Ch 1: What it Means to Own a Share',
                        body: `When a company needs capital to grow, it has two choices: borrow (debt) or sell ownership (equity). Selling ownership to the public is called an **IPO (Initial Public Offering)**.\n\nWhen you buy ONE share of Infosys, you own a tiny fraction of that entire company — its buildings, its intellectual property, its future profits, and your proportional vote on major decisions. You are a **co-owner**, not a lender.\n\n**What determines a share's price?** At its core, a share is worth the **present value of all future cash flows** the company is expected to generate, discounted back to today. In the short term, price is driven by emotion and speculation. In the long term, price follows fundamentals.\n\n**India's two exchanges:**\n- **BSE (Bombay Stock Exchange):** Founded 1875. Asia's oldest stock exchange. Lists over 5,500 companies.\n- **NSE (National Stock Exchange):** Founded 1992. Processes over 95% of India's equity volume. Home of NIFTY 50.\n\nBoth exchanges are regulated by **SEBI (Securities and Exchange Board of India)** — the watchdog that protects investors from fraud and manipulation.`,
                        funFact: `BSE was founded in 1875 under a banyan tree on Dalal Street, Mumbai, making it one of the world's oldest stock exchanges. Today, trades execute in microseconds on servers — but the same "Dalal Street" address still carries the weight of 150 years of market history.`,
                        activity: `Look up any one company whose product you use daily (Zomato, Titan, Asian Paints). Find its share price on NSE. Now look at a 3-year price chart. What major events caused the biggest price swings?`,
                    },
                    {
                        title: 'Ch 2: NIFTY 50, Sensex & Reading the Market',
                        body: `**Sensex (BSE):** Tracks the 30 largest, most actively traded companies on BSE. It's a weighted average — larger companies have more influence.\n\n**NIFTY 50 (NSE):** Tracks 50 companies across 13 sectors. Considered India's primary market benchmark.\n\n**NIFTY Composition (2024 approximation):**\n| Sector | Weight |\n|---|---|\n| Financial Services | ~33% |\n| Information Technology | ~13% |\n| Oil & Gas | ~11% |\n| FMCG | ~9% |\n| Auto | ~8% |\n| Others | ~26% |\n\n**Why does the index move?**\n- Corporate earnings announcements (Reliance quarterly results move the index)\n- RBI policy decisions (interest rate changes affect all stocks)\n- Global triggers (US Federal Reserve decisions, oil prices, geopolitics)\n- Foreign Institutional Investor (FII) flows (when FIIs buy/sell billions, markets swing)\n\n**Historical NIFTY data:**\n| Year | NIFTY 50 Level |\n|---|---|\n| 2000 | ~1,500 |\n| 2008 (crash) | ~2,524 |\n| 2014 | ~8,000 |\n| 2020 (COVID low) | ~7,610 |\n| 2024 | ~25,000+ |\n\n**Key Lesson:** Despite crashes in 2008 and 2020, the NIFTY has always recovered and reached new highs. Long-term equity investors in India have been rewarded.`,
                        activity: `Track NIFTY 50 every morning for two weeks. Write one sentence about what news (if any) you think caused that day's movement. Build the habit of reading financial news like an investor.`,
                    },
                    {
                        title: 'Ch 3: Fundamental Analysis — Is a Stock Cheap or Expensive?',
                        body: `The most important skill for any investor is knowing whether a stock's price reflects its actual VALUE.\n\n**Key Valuation Metrics:**\n\n**P/E Ratio (Price-to-Earnings):**\nP/E = Share Price ÷ Annual Earnings Per Share\n- This tells you: "How many years of current earnings would it take to pay back the share price?"\n- NIFTY 50 average P/E: ~20-22x (historically). Above 25 = expensive. Below 16 = possibly cheap.\n- Example: If TCS trades at ₹4,000 and earns ₹120 EPS → P/E = 33x (premium valuation)\n\n**P/B Ratio (Price-to-Book):**\nHow much are you paying relative to the company's actual net assets? A P/B below 1 can indicate undervaluation.\n\n**Debt-to-Equity (D/E) Ratio:**\nHow much debt does the company carry relative to shareholder equity? High D/E (>2x) in cyclical industries is risky.\n\n**Return on Equity (ROE):**\nROE = Net Profit ÷ Shareholder Equity × 100\nMeasures how efficiently management uses shareholder money. ROE > 15% consistently = quality business.\n\n**Buffett's approach:** Only buy companies you understand, with strong competitive moats, led by trustworthy management, at reasonable prices — then hold forever.`,
                        activity: `🏠 HOME ACTIVITY: Pick any one company from NIFTY 50 (preferably one whose products your family uses). Look up its P/E ratio, ROE, and D/E ratio on Screener.in (free). Based on these numbers, would you consider it expensive or reasonable? Write a 5-sentence "Investment Thesis."`,
                    },
                ],
            },
            {
                month: 'August', topic: 'Mutual Funds, SIPs & Index Investing', type: 'Theory',
                status: 'current',
                proTip: 'Index funds beat 80% of professionally managed funds over 10+ years. Low cost wins.',
                steps: [
                    {
                        title: 'Ch 1: Why Mutual Funds Exist',
                        body: `Selecting individual stocks requires significant research, discipline, and expertise. Most retail investors fail at stock-picking — not because they are unintelligent, but because they compete against full-time professionals with massive resources.\n\n**Mutual Funds solve this by pooling:**\n- Thousands of investors contribute money\n- A professional Fund Manager invests the pool across dozens of stocks\n- Each investor owns units proportional to their contribution\n- Risk is spread (diversification)\n- Even ₹500 can buy fractional exposure to 50+ companies\n\n**Key Mutual Fund Types:**\n| Type | Invests In | Risk | Expected Return |\n|---|---|---|---|\n| Large Cap Equity | Top 100 companies | Moderate | 12-14% |\n| Mid Cap Equity | Companies 101-250 | Higher | 14-17% |\n| Small Cap Equity | Companies 251+ | Highest | 15-20%+ |\n| Debt/Bond | Government & Corp bonds | Low | 6-8% |\n| Hybrid | Mix of equity & debt | Medium | 9-12% |\n| Index Fund | Replicates NIFTY/Sensex | Moderate | 12-14% |\n| ELSS (Tax Saving) | Equity + tax benefit | Moderate | 12-15% |\n\n**Expense Ratio:** The annual fee charged by the fund. Actively managed funds charge 0.5-2.5%. Index Funds charge just 0.05-0.2%. Over 20 years, this difference can cost lakhs!`,
                        activity: `Compare on Valueresearch.in: Pick one "Large Cap Active Fund" and compare its 10-year return against the "UTI NIFTY 50 Index Fund." Which performed better? By how much? How much higher was the active fund's expense ratio?`,
                    },
                    {
                        title: 'Ch 2: SIP — The Wealth-Building Machine for Ordinary Indians',
                        body: `**SIP (Systematic Investment Plan)** automates monthly investing. On a fixed date, a predetermined amount is automatically deducted from your bank account and invested in your chosen mutual fund — regardless of market conditions.\n\n**Why SIP beats trying to time the market:**\n\nWhen markets are UP: Your ₹1,000 buys fewer units (units are expensive).\nWhen markets are DOWN: Your ₹1,000 buys MORE units (units are cheap).\nOver time, this averages out to a lower cost-per-unit — called **Rupee Cost Averaging**.\n\n**SIP Growth Table (₹1,000/month at 12% annual return):**\n| Duration | Amount Invested | Final Value | Wealth Created |\n|---|---|---|---|\n| 5 years | ₹60,000 | ₹82,000 | ₹22,000 |\n| 10 years | ₹1.2 Lakhs | ₹2.3 Lakhs | ₹1.1 Lakhs |\n| 15 years | ₹1.8 Lakhs | ₹5.0 Lakhs | ₹3.2 Lakhs |\n| 20 years | ₹2.4 Lakhs | ₹9.9 Lakhs | ₹7.5 Lakhs |\n| 30 years | ₹3.6 Lakhs | ₹35.0 Lakhs | ₹31.4 Lakhs |\n\nFrom just ₹1,000/month — the cost of two pizzas — you can build ₹35 Lakhs in 30 years. With ₹5,000/month, that would be **₹1.75 Crore**.`,
                        funFact: `India's total SIP inflows crossed ₹21,000 crore PER MONTH in 2024 — up from just ₹3,000 crore in 2018. Over 7 crore SIP accounts are active. India is quietly becoming a nation of disciplined equity investors.`,
                        activity: `Use the SIP Calculator on Groww.in or ET Money. Simulate: If you invest ₹2,000/month starting at age 18 with 12% return, what do you have at age 40? At age 60? The difference between starting at 18 vs 25 — calculate that too!`,
                    },
                    {
                        title: 'Ch 3: Why Index Funds Win (The Case Against Active Management)',
                        body: `Every year, SPIVA (S&P Indices Versus Active) releases a report comparing actively managed mutual funds against their benchmark index. The findings are consistent and striking:\n\n- In India, **over 75% of large-cap active funds underperform the NIFTY 50** over a 5-year period\n- Over 10 years, over **85% underperform**\n- Over 15 years, nearly **90% underperform**\n\n**Why do active funds fail to beat the index?**\n1. **Costs:** An active fund charging 1.5% annually requires just beating the index by 1.5% every year — consistently. Very few managers do this.\n2. **Over-diversification:** Many large funds hold 80-100 stocks, essentially becoming a high-cost index.\n3. **Cognitive bias:** Fund managers are human. They panic, chase trends, and make emotional decisions — just like retail investors.\n\n**The Index Fund Advantage:**\n- Expense ratio of 0.05-0.2% (vs 0.5-2.5% for active)\n- No fund manager risk (the index doesn't quit, retire, or face conflict of interest)\n- Automatic rebalancing (weak companies exit, strong companies enter)\n- Tax efficient (lower turnover = fewer taxable events)\n\n**Best Index Funds in India (2024):** Nippon India Nifty 50, UTI Nifty 50, HDFC Index Fund — all with expense ratios under 0.2%.`,
                        activity: `🏠 HOME ACTIVITY: Ask your parent whether they have any investment in mutual funds. What type? Active or Index? What is the expense ratio? Using Valueresearch.in, check the fund's 5-year return vs the Nifty 50 benchmark. Is the active fund worth its higher cost?`,
                    },
                ],
            },
            {
                month: 'December', topic: 'Home Quest: Virtual Stock Portfolio', type: 'Quest',
                status: 'locked',
                proTip: 'Paper trading builds discipline without risking real money.',
                steps: [
                    {
                        title: 'The Virtual Investor Challenge',
                        body: `Build a hypothetical ₹1 Lakh portfolio using real market prices from NSE. Select 5 companies using the P/E, ROE, D/E analysis from Chapter 3. Allocate the ₹1 Lakh across them. Track daily for 30 days.\n\nAt month end: calculate your return, your benchmark (NIFTY 50 return), and analyse what you got right and wrong.`,
                        activity: `🏠 HOME ACTIVITY: Create a Google Sheet with: Company, Buy Price, Quantity, Total Investment, Current Price, Current Value, Gain/Loss %. Compare your portfolio return vs NIFTY 50 return over the same period. What is your biggest learning?`,
                    },
                ],
            },
        ],
    },

    10: {
        grade: 10, bookTitle: 'The Auditor', subtitle: 'GST, Taxes & the Social System', theme: 'corporate',
        complexityNote: 'Tax mechanics, compliance, real calculations. Critical thinking on policy.',
        modules: [
            {
                month: 'April', topic: 'GST: India\'s Unified Tax Revolution', type: 'Theory',
                status: 'passed', score: 80,
                proTip: 'GST is not just a tax. It\'s a real-time economic data system that the government uses to track GDP, detect evasion, and allocate resources.',
                steps: [
                    {
                        title: 'Ch 1: The Tax Jungle Before GST (Pre-2017 India)',
                        body: `Before July 1, 2017, India's tax system was a layered, fragmented chaos that made doing business across states enormously difficult:\n\n**Pre-GST Tax Stack on a Manufactured Product:**\n1. **Central Excise Duty** (12%) → Paid when goods leave the factory\n2. **VAT** (4-15%, varied by state) → Paid at point of sale. Tamil Nadu, Maharashtra, UP all had different VAT rates for the same product!\n3. **CST** (2%) → Tax for moving goods across state borders\n4. **Entry Tax / Octroi** → Additional local body taxes in some states\n5. **Service Tax** (14.5%) → On services separately\n\n**The cascading effect ("tax on tax"):**\nIf a manufacturer paid 12% excise duty on ₹100 product cost (paying ₹12), the dealer added his profit on ₹112 (the cost inclusive of excise) and then paid VAT on that higher amount. This meant consumers ultimately paid tax on tax on tax — inflating final prices significantly.\n\n**Logistical nightmare:** Trucks moved goods state-to-state. Each border had checkpoints with hours-long queues for documentation. This cost India an estimated 14.4% of GDP in logistics costs (vs ~8% for advanced economies).`,
                        funFact: `Before GST, a truck journey from Mumbai to Delhi took approximately 65 hours. Of those 65 hours, nearly **30 hours were spent waiting at state border checkpoints** for tax documentation. After GST eliminated most of these checkpoints through e-way bills, transit times dropped by nearly 40%.`,
                        activity: `Research: Find one product you buy regularly (say, a phone charger or notebook). See if you can find what taxes it paid pre-2017 vs post-GST. The government's "GST Journey" website has case studies.`,
                    },
                    {
                        title: 'Ch 2: How GST Works — The Input Tax Credit Revolution',
                        body: `**GST is a multi-stage, destination-based consumption tax.** It is collected at each stage of the supply chain but structured to be neutral for businesses through the **Input Tax Credit (ITC) mechanism**.\n\n**Example — A Shirt's Journey:**\n| Stage | Value Added | GST Collected | ITC Claimed | Net GST Paid |\n|---|---|---|---|---|\n| Cotton Farmer | ₹200 | ₹24 (12%) | ₹0 | **₹24** |\n| Textile Mill | ₹500 (adds ₹300) | ₹60 (12%) | ₹24 | **₹36** |\n| Garment Maker | ₹900 (adds ₹400) | ₹108 (12%) | ₹60 | **₹48** |\n| Retailer | ₹1,200 (adds ₹300) | ₹144 (12%) | ₹108 | **₹36** |\n| **Total Revenue** | | | | **₹144 (= 12% of ₹1,200)** |\n\nNotice: The total GST revenue collected = exactly 12% of the FINAL price, even though it was collected across 4 stages. No "tax on tax" — ITC eliminates the cascading effect.\n\n**GST Slabs (2024):**\n- 0% — Fresh vegetables, milk, eggs, books, newspapers, educational services\n- 5% — Packaged food, medicines, railways, budget hotel rooms\n- 12% — Processed food, business class hotels, mobiles\n- 18% — Most manufactured goods, restaurants, financial services, electronics\n- 28% — Luxury cars, tobacco, aerated drinks, casinos; + additional **Cess** on some items`,
                        activity: `Next time you get a restaurant bill, identify: (a) CGST amount, (b) SGST amount. Add them — this is 18% GST split equally between central and state governments. Calculate: What % of your restaurant bill actually goes to the government?`,
                    },
                    {
                        title: 'Ch 3: GST Compliance, GST Numbers & Real-World Impact',
                        body: `**GSTIN (GST Identification Number):** Every business with turnover above ₹20 Lakhs must register for GST. Each GSTIN is a 15-digit alphanumeric code:\n- First 2 digits: State code (07 = Delhi, 27 = Maharashtra, 29 = Karnataka)\n- Next 10: Business's PAN number\n- 13th digit: Entity number for the state\n- Last 2: Check digits\n\n**Filing Returns:** GST-registered businesses file monthly returns (GSTR-1 for outward supplies, GSTR-3B for summary). Late filing attracts penalties.\n\n**GST's Impact on the Economy:**\n- GST collections have crossed **₹1.5 Lakh Crore per MONTH** in 2024 — compared to ₹92,000 Crore/month before GST\n- Tax base widened dramatically: businesses that hid sales (since state VAT had weaknesses) can no longer evade since their buyers claim ITC against supplier invoices — creating automatic mutual verification\n- E-way bill system has digitized 95%+ of inter-state goods movement\n\n**Controversies:** GST is charged on health insurance premiums (18%!) and life insurance — which many argue discourages people from protecting themselves. This remains a live policy debate.`,
                        activity: `🏠 HOME ACTIVITY: Find your family's last electricity bill, internet bill, and one restaurant receipt. Identify the GST component on each. Are they at 5%, 12%, or 18%? Look up WHY each is at that rate — is electricity a necessity or luxury according to the GST council?`,
                    },
                ],
            },
            {
                month: 'August', topic: 'Income Tax: Slabs, Deductions & Smart Filing', type: 'Theory',
                status: 'current',
                proTip: 'Tax planning is a legal right. Every 80C, 80D, and HRA exemption is the government incentivizing healthy financial behaviour.',
                steps: [
                    {
                        title: 'Ch 1: India\'s Income Tax Architecture',
                        body: `India taxes income under 5 heads:\n1. **Salary Income** — Employment earnings\n2. **Income from House Property** — Rent earned\n3. **Business/Professional Income** — Self-employment\n4. **Capital Gains** — Profit from selling investments/property\n5. **Income from Other Sources** — Interest, dividends, lottery\n\n**India uses a Progressive Tax System** — higher income = higher marginal rate. But ONLY the income in each slab is taxed at that rate, not the entire income.\n\n**New Tax Regime (FY 2024-25) — Default regime:**\n| Income Slab | Tax Rate |\n|---|---|\n| Up to ₹3,00,000 | Nil |\n| ₹3,00,001 – ₹7,00,000 | 5% (Rebate u/s 87A → effectively NIL up to ₹7L) |\n| ₹7,00,001 – ₹10,00,000 | 10% |\n| ₹10,00,001 – ₹12,00,000 | 15% |\n| ₹12,00,001 – ₹15,00,000 | 20% |\n| Above ₹15,00,000 | 30% |\n\n**Old Tax Regime** (optional): More deductions available (80C, 80D, HRA) but higher base rates. Beneficial for those with significant deductions.\n\n**Standard Deduction:** ₹75,000 auto-deducted from salary income before tax calculation (New Regime, FY25).`,
                        activity: `Tax Calculation Exercise: A software engineer earns ₹12,50,000 annual salary. Under the new regime, calculate the tax:\n- ₹0-3L: ₹0\n- ₹3L-7L: 5% of ₹4L = ₹20,000\n- ₹7L-10L: 10% of ₹3L = ₹30,000\n- ₹10L-12.5L: 15% of ₹2.5L = ₹37,500\n- Total tax before cess = ₹87,500\n- Add 4% Health/Education Cess = ₹3,500\n- **Total: ₹91,000**\nCheck: Is this before or after the ₹75,000 standard deduction?`,
                    },
                    {
                        title: 'Ch 2: Deductions, Exemptions & Smart Tax Planning',
                        body: `**Old Tax Regime Deductions (opt-in required):**\n\n**Section 80C — Up to ₹1.5 Lakh deduction:**\n- PPF contributions\n- ELSS mutual funds (3-year lock-in, equity returns)\n- Life insurance premiums\n- Home loan principal repayment\n- Children's tuition fees\n- 5-year Tax Saving FD\n- NSC (National Savings Certificate)\n- EPF employee contribution\n\n**Section 80D — Health Insurance Premium:**\n- Self + family: up to ₹25,000 deduction\n- Parents (senior citizens): up to ₹50,000 additional\n- Maximum possible: ₹75,000 if parents are senior citizens\n\n**HRA Exemption:** If you receive House Rent Allowance as part of salary AND pay actual rent, a formula-based exemption can significantly reduce taxable income.\n\n**NPS (Section 80CCD(1B)):** Additional ₹50,000 deduction for contribution to National Pension System — over and above the ₹1.5L cap of 80C.\n\n**Capital Gains Tax:**\n- **STCG (< 1 year holding):** 20% on equity gains\n- **LTCG (> 1 year holding):** 12.5% on gains above ₹1.25 Lakh (equity) — effective from July 2024 budget`,
                        activity: `Tax Saving Exercise: An IT professional earns ₹15L. In the tax calculation, compare:\n(A) New Regime: No deductions except ₹75K standard deduction (taxable = ₹14.25L)\n(B) Old Regime: Claims 80C (₹1.5L) + 80D (₹25K) + HRA (hypothetical ₹1.5L) = ₹3.25L deductions (taxable = ₹11.75L)\nWhich regime saves more tax? The answer depends on individual numbers — this is exactly why a tax advisor or software (like Cleartax) is valuable.`,
                    },
                    {
                        title: 'Ch 3: Filing an ITR — The Process & Your Rights',
                        body: `**ITR (Income Tax Return)** is a form filed with the Income Tax Department declaring your income, deductions claimed, and tax paid.\n\n**Why file even if no tax is owed?**\n- Required for getting a home loan, business loan, or visa\n- Establishes income proof\n- Allows you to claim TDS refunds\n- Builds your financial track record\n- Compulsory above ₹2.5L income (basic exemption)\n\n**The ITR Filing Process:**\n1. Collect Form 16 (from employer), Form 26AS (tax credit statement), AIS (Annual Information Statement)\n2. Login to incometax.gov.in with PAN/Aadhaar\n3. Choose the correct ITR form (ITR-1 for salary, ITR-2 for capital gains, ITR-3/4 for business)\n4. Pre-filled data populated automatically — verify and correct\n5. Claim all eligible deductions\n6. Pay any remaining tax / confirm refund\n7. e-Verify using Aadhaar OTP\n\n**Deadline:** July 31st for individuals without audits. Late filing attracts ₹5,000 penalty.\n\n**Your Tax Rights:** Under the Taxpayer's Charter, you have the right to be treated fairly, get decisions in a reasonable time, appeal any order, and seek information about your case.`,
                        activity: `🏠 HOME ACTIVITY: With your parent, navigate to incometax.gov.in (no login needed to view forms). Download Form ITR-1 for reference. Look at its 7 key sections: Personal info, Gross Income, Deductions, Tax Computation, Tax Payment, TDS, and Refund. How many of these sections can you explain based on this lesson?`,
                    },
                ],
            },
            {
                month: 'December', topic: 'Home Quest: Mock Tax Filing Workshop', type: 'Quest',
                status: 'locked',
                proTip: 'Understanding your parents\' tax return is one of the most practical financial skills you can learn.',
                steps: [
                    {
                        title: 'Tax Return Analysis Workshop',
                        body: `With your parent's guidance (and only with their permission), look at a recent ITR acknowledgment or Form 16. Identify: (1) Gross Salary shown, (2) Deductions claimed under 80C/80D, (3) Total tax paid, (4) Any TDS refund. Plot this on a simple table.`,
                        activity: `🏠 HOME ACTIVITY: Create a simplified "Family Tax Summary" — annual income, major deductions, effective tax rate (total tax ÷ gross income × 100). Compare your effective rate to the slab rates. What makes it lower? This is the value of tax planning.`,
                    },
                ],
            },
        ],
    },

    11: {
        grade: 11, bookTitle: 'The Analyst', subtitle: 'Asset Classes & Wealth Architecture', theme: 'analyst',
        complexityNote: 'Portfolio theory, multi-asset allocation, business analysis, entrepreneurship frameworks.',
        modules: [
            {
                month: 'April', topic: 'The 6 Asset Classes: Building a Robust Portfolio', type: 'Theory',
                status: 'passed', score: 88,
                proTip: 'Diversification is the only free lunch in investing (Nobel laureate Harry Markowitz). True diversification means low correlation, not just many assets.',
                steps: [
                    {
                        title: 'Ch 1: Why Concentration Kills Wealth',
                        body: `Most financial disasters — from Harshad Mehta investors in 1992 to crypto retail investors in 2022 — share one common failure: **over-concentration in one asset class at the wrong time**.\n\nTrue diversification doesn't mean owning 10 different tech company stocks. That's concentration in one sector. True diversification means owning DIFFERENT TYPES of assets that respond differently to economic conditions.\n\n**The 6 Primary Asset Classes:**\n\n| Asset Class | Returns (Long Run) | Risk Profile | Liquidity | Inflation Hedge? |\n|---|---|---|---|---|\n| **Equity (Stocks)** | 12-18% | High | High | Strong |\n| **Debt (Bonds/FD)** | 6-9% | Low | Medium | Weak |\n| **Real Estate** | 8-13% | Medium | Low | Strong |\n| **Gold** | 7-10% | Medium | High | Strong |\n| **Commodities** | Variable | High | Medium | Strong |\n| **International** | 10-15% | Medium-High | High | Strong |\n\n**Correlation is the key concept:** Assets that move in opposite directions (negative correlation) provide the best diversification. When Indian equity falls, gold typically rises (flight to safety). When inflation rises, real estate typically appreciates. Building a portfolio means choosing assets whose combined volatility is lower than any individual asset's volatility.`,
                        funFact: `Harry Markowitz won the Nobel Prize in Economics in 1990 for his "Modern Portfolio Theory" which proved mathematically in 1952 that a diversified portfolio could achieve the same expected return as a concentrated portfolio, but with significantly lower risk. His insight: **risk and return are linked, but diversification breaks that link partially**.`,
                        activity: `Analyse the Tata Group: List 5 different industries Tata operates in (auto, steel, IT, retail, airlines, etc.). How does this diversification protect Tata's overall profitability when one sector faces a downturn? Apply this same logic to your personal investment portfolio.`,
                    },
                    {
                        title: 'Ch 2: Equity Deep Dive — Direct Stocks vs. Funds vs. ETFs',
                        body: `**Direct Stocks:**\nBuying shares of individual companies through a Demat + Trading account.\n- Pro: Unlimited upside, dividends, voting rights, zero ongoing fees\n- Con: Requires deep research, high conviction, and psychological strength during crashes\n- Required skill: Understanding financial statements, industry analysis, competitive moats\n- Who should do this: Investors willing to spend 5+ hours/week on research\n\n**Mutual Funds (Active):**\nPortfolio of stocks managed by a professional Fund Manager.\n- Pro: Diversified, professionally managed, accessible with small amounts\n- Con: 0.5-2.5% expense ratio erodes returns significantly over decades; manager risk\n- Research shows: 85%+ of active funds underperform their index benchmark over 10 years\n\n**ETFs (Exchange Traded Funds):**\nFunds that trade like stocks on the exchange in real-time, tracking an index.\n- NIFTY 50 ETF, Bank NIFTY ETF, Gold ETF, NASDAQ ETF (for US exposure)\n- Expense ratio: 0.03-0.2%\n- Ideal for: Long-term index investing with maximum cost efficiency\n\n**International Diversification:**\nInvesting in US, Global, or Emerging Market funds from India:\n- Motilal Oswal NASDAQ 100 FOF\n- ICICI Pru US Bluechip Equity Fund\n- Mirae Asset NYSE FANG+ ETF\n- Provides exposure to global companies (Apple, Microsoft, Google) that power India's digital economy but aren't listed on Indian exchanges`,
                        activity: `Open an account on Smallcase.com (no investment needed, just browse). Look at 3 thematic baskets — e.g., "EV Revolution," "Nifty 50 Equal Weight," "IT Sector." Analyze their composition, past performance, and expense. Which would you build and why?`,
                    },
                    {
                        title: 'Ch 3: Asset Allocation Across Life Stages',
                        body: `**Lifecycle Allocations** adjust as your risk capacity, income, and financial goals evolve:\n\n**Aggressive Phase (Age 15-30) — Student/Early Career:**\n- 90% Equity (Index Funds + selective stocks)\n- 5% Gold ETF\n- 5% Emergency Fund (Liquid Mutual Fund)\n- Rationale: Maximum time horizon. Can ride through 2-3 full market cycles. Primary need is growth.\n\n**Growth Phase (Age 30-45) — Peak Career/Family:**\n- 70% Equity\n- 15% Real Estate (home loan as forced savings)\n- 10% Debt (corporate bonds, hybrid funds)\n- 5% Gold\n- Rationale: Growing responsibilities; adding stability while maintaining equity exposure.\n\n**Preservation Phase (Age 45-60) — Pre-Retirement:**\n- 50% Equity (large cap, dividend-yielding)\n- 25% Debt (government bonds, PPF, EPF)\n- 15% Real Estate\n- 10% Gold\n- Rationale: Protecting accumulated corpus; cannot afford large drawdowns.\n\n**Income Phase (Age 60+) — Retirement:**\n- 30% Equity (dividend stocks, balanced funds)\n- 50% Debt (Senior Citizen Savings Scheme, FD, annuities)\n- 10% Real Estate (rental income)\n- 10% Gold\n- Rationale: Capital preservation + regular income generation.\n\n**The Thumb Rule:** Equity % = 100 - Age (or 110 - Age for slightly more aggressive allocation).`,
                        activity: `🏠 HOME ACTIVITY: Ask your parent about their current investment mix (savings account, FD, insurance, any MF or stocks). Calculate approximately what % is in equity vs. debt vs. real estate. How does it compare to the recommended allocation for their age? What is the one change that would improve their portfolio most?`,
                    },
                ],
            },
            {
                month: 'August', topic: 'Entrepreneurship, Business Models & the Wealth Creator\'s Mindset', type: 'Theory',
                status: 'current',
                proTip: 'The most valuable financial skill is building something that earns money while you sleep.',
                steps: [
                    {
                        title: 'Ch 1: Understanding Business Models',
                        body: `A Business Model is the mechanism by which a company creates, delivers, and captures value. Analysing business models is both an entrepreneurial skill and an investment skill.\n\n**Key Business Model Types:**\n\n**Asset-Heavy (Capital Intensive):**\nTata Steel, Reliance Industries, IndiGo Airlines. Require massive upfront investment. High barriers to entry. Return on Equity can be modest.\n\n**Asset-Light (Scalable Platform):**\nZomato, Nykaa, PolicyBazaar. Little physical infrastructure. Connect buyers and sellers. Scale rapidly without proportional cost increases. Extremely high ROE potential once profitable.\n\n**SaaS (Software as a Service):**\nZoho, Freshworks (India-origin). Charged monthly/annually. Near-zero marginal cost per additional customer. Creates "recurring revenue" — highly predictable, valued at 10-20x annual revenue by investors.\n\n**Franchise / Distribution:**\nBajaj Finance, HDFC Life distributor network. Build distribution once, earn commissions forever.\n\n**Warren Buffett's Moat Framework:**\nHe only invests in businesses with competitive "moats" — structural advantages that prevent competitors from eating their lunch:\n- **Brand Moat:** Titan, Asian Paints (premium brand loyalty)\n- **Switching Cost Moat:** Zoho, SAP (costly to switch ERP systems)\n- **Network Effect Moat:** NSE (more traders → more liquidity → attracts more traders)\n- **Cost Advantage Moat:** Dmart (EDLP model with lower overheads)\n- **Scale/Regulatory Moat:** SBI (government relationship, license advantage)`,
                        activity: `Pick any Indian startup you know (Zepto, Meesho, Urban Company). Draw a one-page business model diagram: (1) Who is the customer? (2) What problem is solved? (3) How do they charge? (4) What is their moat? (5) What is the biggest threat to that moat? This is how VCs evaluate companies.`,
                    },
                    {
                        title: 'Ch 2: The Entrepreneurial Path for Class 11 Students',
                        body: `**The Two Categories of Income:**\n\n**Active Income:** Trading time for money. Stop working → income stops. Employees, freelancers, self-employed professionals.\n\n**Passive Income:** Systems that generate money with minimal ongoing effort. Business ownership, investments, royalties, rental income.\n\nBuilding passive income streams is the core strategy of financial independence. Here's a practical roadmap for a Class 11 student:\n\n**Stage 1 — Skill Building (Now):**\nIdentify your most marketable skill: coding, video editing, graphic design, writing, teaching, photography. Spend 1-2 hours/day developing it to a professional level using free resources (YouTube, Coursera, GitHub).\n\n**Stage 2 — Freelancing (Age 16-18 with parent's help):**\nBefore you can legally work independently, use a parent's account to offer services on Fiverr, Toptal, or directly via Instagram/LinkedIn. Build a portfolio. Your first ₹5,000 from genuine skill-based work will change your self-concept forever.\n\n**Stage 3 — Asset Building (Age 18+):**\nTransition from billing time (freelancing) to building assets (course, SaaS tool, YouTube channel, newsletter) that earn while you sleep.`,
                        funFact: `Ritesh Agarwal of OYO raised his first funding at **age 19** without completing his college degree. Bhavish Aggarwal of Ola dropped from IIT to start Ola at 24. Nithin Kamath of Zerodha — India's largest broker by active users — started with just ₹50,000 from his savings. The common thread: identified a specific market gap and solved it with focused skill.`,
                        activity: `Conduct a "Skills Audit": List everything you can do that someone would value (even basic: Excel, PowerPoint, English writing, Mathematics tutoring). Research the top 3 on Fiverr India — what do they charge? What level of quality is expected? Can you reach that quality in 90 days?`,
                    },
                    {
                        title: 'Ch 3: Reading a P&L and Balance Sheet (Introduction)',
                        body: `To evaluate a business — whether one you're investing in or one you're building — you need to read its two fundamental financial statements.\n\n**Profit & Loss Statement (P&L) — "How are we doing this year?"**\nIt shows Revenue, Costs, and Profit over a period.\n\nKey Line Items:\n1. **Revenue (Topline):** Total sales\n2. **COGS (Cost of Goods Sold):** Direct costs of producing goods/services\n3. **Gross Profit = Revenue - COGS**\n4. **Gross Margin = Gross Profit / Revenue × 100**\n5. **EBITDA:** Earnings before interest, tax, depreciation, amortisation — the "pure operating profitability"\n6. **PAT (Profit After Tax / Bottomline):** What actually belongs to shareholders\n\n**Balance Sheet — "What do we own and owe?"**\nA snapshot of financial position at a point in time.\n- **Assets:** Cash, receivables, inventory, equipment, IP, investments\n- **Liabilities:** Loans, accounts payable, bonds issued\n- **Equity:** Assets - Liabilities = what belongs to shareholders\n- **The golden equation: Assets = Liabilities + Equity (always)**\n\n**Key Ratios from these statements:**\n- ROE = PAT / Equity × 100 (returns for shareholders)\n- ROCE = EBIT / Capital Employed × 100 (returns on all capital)\n- Debt/Equity = Total Debt / Equity (leverage/risk)\n- NP Margin = PAT / Revenue × 100 (% of sales that become profit)`,
                        activity: `🏠 HOME ACTIVITY: Download the Annual Report of one company from their Investor Relations page (companies like Infosys, Asian Paints are particularly well-written). Find: (1) Revenue for last 3 years (growing?), (2) PAT margin (healthy? declining?), (3) Debt levels, (4) ROE. Write a one-paragraph investment summary.`,
                    },
                ],
            },
            {
                month: 'December', topic: 'Home Quest: Build a Business Plan', type: 'Quest',
                status: 'locked',
                proTip: 'A one-page business plan is worth more than a 100-page document you never act on.',
                steps: [
                    {
                        title: 'The One-Page Business Plan',
                        body: `Using the business model and P&L knowledge from this module, create a one-page business plan for a SERVICE business you could start with zero capital:\n\n1. Problem Statement (what do I solve?)\n2. Target Customer (who exactly?)\n3. Revenue Model (how do I charge?)\n4. Moat (why can't someone else do this?)\n5. 3-Month Revenue Projection (conservative estimate)\n6. Skills needed (do I have them? Timeline to acquire?)`,
                        activity: `🏠 HOME ACTIVITY: Create the one-page plan. Share it with your parent for feedback. If they see value, discuss whether you can test it in a small, real way (even ₹500 in revenue as a proof of concept).`,
                    },
                ],
            },
        ],
    },

    12: {
        grade: 12, bookTitle: 'The Architect', subtitle: 'FIRE, Freedom & Wealth Systems', theme: 'premium',
        complexityNote: 'Advanced wealth engineering: FIRE math, debt mechanics, CIBIL, derivatives intro, estate planning basics.',
        modules: [
            {
                month: 'April', topic: 'FIRE: Financial Independence, Retire Early', type: 'Theory',
                status: 'passed', score: 82,
                proTip: 'FIRE is not about stopping work. It\'s about engineering a life where work becomes optional.',
                steps: [
                    {
                        title: 'Ch 1: The Mathematics of Financial Independence',
                        body: `**FIRE = Financial Independence, Retire Early**\nThe FIRE movement emerged from Vicki Robin's 1992 book "Your Money or Your Life" and gained mathematical rigor from "The Trinity Study" (1998) which analyzed historical market data to determine safe withdrawal rates.\n\n**The Two Core Equations of FIRE:**\n\n**1. The FIRE Number (How Much You Need):**\nFIRE Number = Annual Expenses × 25\n\nThis is derived from the **4% Safe Withdrawal Rate** — the Trinity Study found that withdrawing 4% of a portfolio annually, adjusting for inflation, has never depleted a diversified portfolio over any 30-year historical period from 1926-1995.\n\n**Mathematical Proof:**\nIf portfolio = X and annual withdrawal = 0.04X\nThen annual return needed ≥ 0.04X + inflation adjustment\nHistorically, a 60/40 equity/debt portfolio returned ~7-10% real (After inflation)\n4% withdrawal leaves 3-6% for portfolio growth — portfolio survives and often grows!\n\n**2. The FIRE Date Calculator:**\nFIRE Date depends on your Savings Rate.\n\n| Savings Rate | Years to FIRE |\n|---|---|\n| 5% | ~66 years |\n| 15% | ~43 years |\n| 25% | ~32 years |\n| 40% | ~22 years |\n| 50% | ~17 years |\n| 75% | ~7 years |\n\nAt 50% savings rate: You work 1 year and effectively "fund" 1 year of future freedom. In 17 years, you've funded enough years for indefinite freedom (compound growth kicks in).`,
                        funFact: `The most famous FIRE case study in India is "Anoop" (pseudonym), a Bangalore-based software engineer who achieved FIRE at 38 with ₹3.2 Crore — on a combined family income of ₹25L/year. His strategy: 55% savings rate for 14 years, 100% index fund allocation, and consciously choosing not to upgrade his lifestyle when his salary increased.`,
                        activity: `Calculate YOUR FIRE Number: (1) Estimate your desired monthly lifestyle cost after financial independence (be realistic about India costs). (2) Multiply by 12 for annual expenses. (3) Multiply by 25 for your FIRE number. How many years at ₹30,000/month SIP at 12% return would it take to reach that number? Use an online SIP calculator.`,
                    },
                    {
                        title: 'Ch 2: FIRE Variants & India-Specific Strategies',
                        body: `**Three FIRE Approaches:**\n\n**Lean FIRE:** Strict frugality. Expenses ₹25,000-40,000/month. FIRE number ₹75L-₹1.2Cr. Requires radical simplicity: no luxury travel, minimal dining out — but achievable in 15-20 years on average income.\n\n**Regular FIRE:** Comfortable middle-class lifestyle. Expenses ₹50,000-₹1,00,000/month. FIRE number ₹1.5Cr-₹3Cr. Achievable in 20-25 years for disciplined upper-middle-class households.\n\n**Fat FIRE:** No compromise on lifestyle. Expenses ₹2,00,000+/month. FIRE number ₹6Cr+. Requires high income (₹30L+) or business exit.\n\n**India-Specific Strategies:**\n\n1. **Geographic Arbitrage:** Live in Tier-2 cities (Pune, Jaipur, Kochi) post-FIRE instead of Mumbai/Bangalore. The same lifestyle costs 30-50% less. ₹40,000/month in Kochi = ₹80,000/month in Mumbai.\n\n2. **NPS (National Pension System):** Compulsory annuity at 60 from the corpus, but provides guaranteed monthly income. Tax-efficient (additional ₹50K deduction under 80CCD(1B)). Consider as a FIRE component for later years.\n\n3. **EPF Optimization:** EPF earns ~8.25% (fully tax-free on withdrawal after 5 years). It's a mandated debt allocation that many people don't count as an investment. For salaried employees, EPF is a critical FIRE building block.\n\n4. **Rental Yield:** Indian real estate yields are low (2-3%). But in high-demand micro-markets, well-chosen properties can yield 4-5% + capital appreciation. A paid-off ₹1Cr property earning ₹40K/month rent provides meaningful FIRE income.`,
                        activity: `Build a 3-scenario FIRE plan for yourself:\n(A) Lean FIRE: What is the minimum lifestyle cost? What is the FIRE number? At what age is it achievable at 30% savings rate?\n(B) Regular FIRE: Same analysis.\n(C) Fat FIRE: Same analysis.\nPlot all three as a simple timeline. Which one actually excites you to work toward?`,
                    },
                    {
                        title: 'Ch 3: The Anti-FIRE Arguments & How to Counter Them',
                        body: `FIRE has critics. As an educated investor, you should know the strongest objections and the responses:\n\n**Objection 1: "What if markets crash and never recover?"**\nHistorical data shows no 30-year period in any major economy where diversified equity failed to recover. 2008 crash: recovered in 4 years. COVID crash (2020): recovered in 6 months. Japan's NIFTY equivalent has taken longer — which is why diversification includes international assets.\n\n**Objection 2: "What will you DO all day?"**\nFIRE doesn't mean involuntary idleness. Studies show FIRE retirees spend time on "purpose work" — teaching, writing, art, travel, social causes — without the income pressure. The goal is CHOICE, not vacation forever.\n\n**Objection 3: "Inflation will destroy your corpus."**\nThis is the most legitimate concern. The 4% rule was tested against historical inflation. The mitigation: equity allocation (which historically outpaces inflation by 5-8% real), staying partially in the workforce early in retirement, and geographic arbitrage.\n\n**Objection 4: "Indian markets are too volatile."**\nNIFTY 50 delivered ~14% CAGR over 20 years (2004-2024), including 2 major crashes. NIFTY SIP return on any 15-year window has been positive. The risk isn't Indian markets — it's single-stock or single-sector concentration.\n\n**Your Personal FIRE Philosophy:** FIRE works best as a framework for intentional living — making economic choices aligned with long-term security — not as a cult to be followed blindly.`,
                        activity: `🏠 HOME ACTIVITY: Have a "FIRE Conversation" with your parent. Share the 4% rule and the FIRE number concept. Ask: "If we saved 30% of our income starting today, when would we potentially be financially independent?" Use an online FIRE calculator. What would need to change in the family budget to achieve this?`,
                    },
                ],
            },
            {
                month: 'August', topic: 'Debt, Credit Score & Advanced Financial Architecture', type: 'Theory',
                status: 'current',
                proTip: 'A CIBIL score above 750 is your passport to low-interest loans. Build it before you need it.',
                steps: [
                    {
                        title: 'Ch 1: The Architecture of Debt',
                        body: `Debt is the most misunderstood financial instrument. Avoiding all debt is as dangerous as overusing it.\n\n**The Debt Spectrum:**\n\n**Productive Debt (Rate below ROI of funded asset):**\n- Home Loan at 8.5%: Property appreciating 10-12%/year → positive spread → wealth-building\n- Education Loan at 8%: Medical/IIT degree increasing earning power by 200%+ → extremely high ROI\n- Business Loan at 12%: Business earning 25% ROI → net 13% spread → wealth-creating\n\n**Neutral Debt:**\n- Car Loan at 9%: Car depreciates, but transport is essential. Manageable if kept short tenure and low EMI-to-income ratio.\n\n**Destructive Debt (Rate exceeds any reasonable return):**\n- Credit Card Revolving Balance: 3-4%/month = 36-48%/year. THERE IS NO INVESTMENT IN INDIA THAT RELIABLY RETURNS 36%/year. This is mathematically guaranteed to make you poorer.\n- Personal Loans for consumption (weddings, vacations): 14-24%/year. Funds depreciating experiences.\n- BNPL (Buy Now Pay Later) / Payday Loans: Often 24-60%/year effective rates.\n\n**The Debt Avalanche Method (mathematically optimal):**\n1. List all debts by interest rate (descending)\n2. Pay minimums on all\n3. Direct every surplus rupee at the highest-rate debt\n4. Once paid, roll that payment into the next highest\n5. Repeat until debt-free`,
                        funFact: `A person carrying ₹1 Lakh in credit card debt at 3.5%/month (42% annual) pays approximately **₹42,000 in interest per year** — just to stand still. If this same ₹1 Lakh was invested in an Index Fund at 12%, it would grow by ₹12,000/year. The credit card is costing 3.5x what the best passive investment can earn.`,
                        activity: `Calculate the true cost of a credit card trap: If someone has ₹50,000 on a credit card at 3.5%/month and makes only the minimum payment of ₹5,000/month, use an Excel amortization table (or Google "credit card minimum payment calculator"). How many months to pay off? How much total interest paid?`,
                    },
                    {
                        title: 'Ch 2: CIBIL Score — Your Financial Passport',
                        body: `**CIBIL Score** is India's primary credit scoring system, operated by TransUnion CIBIL. It ranges from **300 (lowest) to 900 (highest)**.\n\n**Score Bands:**\n| Score | Rating | Implication |\n|---|---|---|\n| 750-900 | Excellent | Best rates, instant approvals. 8.5% home loan rate. |\n| 700-749 | Good | Most loans approved. May face margin rates. |\n| 650-699 | Fair | Limited lenders, higher rates (+0.5-1%). |\n| 600-649 | Poor | Likely rejection from major banks. NBFCs only. |\n| Below 600 | Very Poor | Near-impossible to get institutional credit. |\n\n**What Builds Your Score:**\n- ✅ Paying ALL credit obligations on time (highest impact — 35% of score)\n- ✅ Credit utilization below 30% (using ₹30K of a ₹1L limit)\n- ✅ Long, stable credit history (don't close old cards)\n- ✅ Mix of credit types (credit card + loan = better than just one)\n- ✅ Fewer credit inquiries (each hard inquiry drops score ~5 points)\n\n**What Destroys Your Score:**\n- ❌ ANY missed EMI or credit card payment\n- ❌ Loan settlement (settled ≠ closed; it's a negative mark for 7 years)\n- ❌ High utilization (using ₹95K of ₹1L limit signals stress)\n- ❌ Multiple loan applications in short period\n\n**Building Credit from Age 18:**\n1. Get a secured credit card (₹10,000-₹25,000 FD as collateral)\n2. Use maximum 20-25% of limit monthly\n3. Pay 100% of statement balance (not minimum) every month\n4. Do this for 12 months → CIBIL score of 700+`,
                        activity: `Calculate the REAL cost of a poor CIBIL score on a home loan:\n- Home loan amount: ₹50 Lakhs, 20-year tenure\n- With CIBIL 780 (Excellent): Interest rate 8.5%. EMI = ₹43,391. Total interest = ₹54.1L\n- With CIBIL 650 (Fair): Interest rate 10.5%. EMI = ₹49,919. Total interest = ₹69.8L\n- Difference: ₹15.7 Lakh extra paid JUST because of a poor credit score — over the same loan.`,
                    },
                    {
                        title: 'Ch 3: Advanced Financial Instruments Overview',
                        body: `As a Class 12 student who may soon be 18 and investing independently, here is a brief introduction to advanced instruments you'll encounter:\n\n**PPF (Public Provident Fund):**\n- Government-backed, sovereign guarantee\n- 15-year lock-in (extendable in 5-year blocks)\n- Interest rate ~7.1% (set by government quarterly, tax-free)\n- EEE status: Exempt-Exempt-Exempt (contribution deduction + interest growth + withdrawal all tax-free)\n- Maximum: ₹1.5L/year\n- Ideal for: Conservative long-term savings component\n\n**NPS (National Pension System):**\n- Market-linked pension product\n- Automatic asset allocation: Equity (up to 75%) + Government Bonds + Corporate Bonds\n- At 60: 60% can be withdrawn lump sum (partially taxable), 40% must buy annuity\n- Additional ₹50K tax deduction under 80CCD(1B)\n\n**Options & Futures (Introduction Only — NOT for beginners):**\nDerivatives are contracts whose value is derived from an underlying asset (stock, index, commodity).\n- **Futures:** Agreement to buy/sell an asset at a future date at today's price. High leverage, high risk.\n- **Options:** Right (not obligation) to buy (Call) or sell (Put) at a fixed price before expiry. Limited downside for buyer, unlimited downside for seller.\n- NSE F&O segment processes $200 Billion+ daily — 97%+ of traders lose money in F&O\n- **Complete avoidance is the correct Class 12 strategy** for F&O.\n\n**REITs (Real Estate Investment Trusts):**\nListed on NSE. Allow retail investors to own commercial real estate (office parks, malls) with ₹10,000-20,000 minimum investment. Distribute 90% of income as dividends. Current yield: ~6-8%.`,
                        activity: `🏠 HOME ACTIVITY: Create your "Financial Architecture Blueprint" — a one-page document showing your planned asset allocation and financial tools at age 25 (5-7 years from now). Include: Emergency Fund target, SIP amount and fund, any planned FD/PPF, CIBIL score goal, and side income target. Discuss with your parent. This is your first real financial plan.`,
                    },
                ],
            },
            {
                month: 'December', topic: 'Home Quest: Your 5-Year Wealth Blueprint', type: 'Quest',
                status: 'locked',
                proTip: 'Every ₹1,000 invested at 22 becomes ₹10,000 at 42 at 12% return. This is the most leveraged moment of your financial life.',
                steps: [
                    {
                        title: 'The 5-Year Wealth Architect Plan',
                        body: `Compile everything from Class 12 into your personal 5-year wealth blueprint:\n1. Career path and income target by Age 22-25\n2. Savings rate target (%)\n3. Investment allocation plan (which funds, how much)\n4. FIRE number calculated\n5. One skill or business idea being developed\n6. CIBIL score plan (how to build from 18)\n7. Current list of Needs to eliminate from spending`,
                        activity: `🏠 HOME ACTIVITY: Present this plan to your parent as a formal "Financial Presentation" — even 5-10 minutes. Invite their feedback, critique, and additions. This is exactly what a real financial advisor would create. Now you are your own advisor.`,
                    },
                ],
            },
        ],
    },
};
