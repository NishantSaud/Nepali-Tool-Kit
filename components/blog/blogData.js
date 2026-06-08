// components/blog/blogData.js
// ─────────────────────────────────────────────────────────────
// Blog post data — 5 SEO-optimized posts about Nepal finance topics
// ─────────────────────────────────────────────────────────────

export const posts = [
  {
    slug: 'gold-price-nepal',
    title: 'Gold Price in Nepal Today — Updated Daily Guide',
    excerpt: 'Complete guide to understanding gold prices in Nepal, including FNGOSDA rates, import duties, hallmark charges, and how international prices translate to Nepal retail rates.',
    category: 'Finance',
    badgeVariant: 'warning',
    emoji: '✨',
    gradient: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 50%, #FEF3C7 100%)',
    date: 'June 5, 2026',
    author: 'NepalToolkit Team',
    content: `Gold has been an integral part of Nepali culture for centuries. Whether you're buying for investment, weddings, or festivals, understanding gold pricing in Nepal is essential.

## Why Nepal's Gold Prices Differ from International Rates

Nepal's gold retail prices are significantly higher than international spot prices. Here's why:

- **Import Duty:** Nepal imposes customs duties on gold imports
- **GST (13%):** Value-added tax applied at the point of sale
- **Hallmarking Charges:** Testing and certification fees
- **Dealer Margins:** Retailer profit margins typically 2-5%
- **Transportation Costs:** Logistics from international markets

These factors combined add approximately 100-135% to the international base price.

## How Gold Prices are Set in Nepal

The Federation of Nepal Gold & Silver Dealers (FNGOSDA) publishes official rates daily at 11:00 AM Nepal Time. These rates are based on:

1. International gold spot price (XAU/USD)
2. USD to NPR exchange rate
3. Current import duty and tax rates
4. Market demand and supply conditions

## Gold Types in Nepal

### Hallmark Gold (99.9% purity)
The standard for most gold purchases in Nepal. Hallmark gold carries the FNGOSDA certification stamp.

### Tajabi Gold (99.5% purity)
Slightly lower purity, typically priced Rs. 500-1,000 less per tola than hallmark gold.

## Understanding the Price Breakdown

For a tola of hallmark gold (11.66 grams):

- International gold price: ~40% of retail price
- Import duty & GST: ~35%
- Dealer margins & operational costs: ~15%
- Hallmarking, insurance & other charges: ~10%

## Tips for Buying Gold in Nepal

1. Always buy hallmark-certified gold from registered dealers
2. Compare prices across multiple dealers before purchasing
3. Keep all receipts for future resale or exchange
4. Consider current market trends and festival seasons
5. Use NepalToolkit's gold price tracker for real-time updates

## FAQ

**Q: Why do gold prices change daily?**
A: Gold prices fluctuate based on international markets, exchange rates, and local demand-supply dynamics.

**Q: Can I buy gold online in Nepal?**
A: Most transactions still happen through physical dealers, but some banks offer gold savings schemes.

**Q: What is the difference between per tola and per gram pricing?**
A: 1 tola = 11.66 grams. Per tola pricing is the standard in Nepal.`,
  },
  {
    slug: 'nepse-profit-calculator',
    title: 'How to Calculate NEPSE Profit in Nepal',
    excerpt: 'Step-by-step guide to calculating your stock trading profit on NEPSE, including brokerage fees, SEBON charges, CDS fees, and capital gains tax.',
    category: 'Investing',
    badgeVariant: 'success',
    emoji: '📈',
    gradient: 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 50%, #DCFCE7 100%)',
    date: 'June 3, 2026',
    author: 'NepalToolkit Team',
    content: `The Nepal Stock Exchange (NEPSE) has seen growing participation from retail investors. Understanding how to calculate your actual profit — after all fees and taxes — is crucial for making informed investment decisions.

## The Complete Cost of a NEPSE Trade

When you buy and sell shares on NEPSE, multiple fees apply at each stage:

### When Buying:
- **Brokerage Commission:** 0.27% to 0.40% (tiered)
- **SEBON Fee:** 0.015% of transaction value
- **CDS & Clearing Fee:** 0.02% of transaction value

### When Selling:
- **Brokerage Commission:** Same tiered rates
- **SEBON Fee:** 0.015%
- **CDS & Clearing Fee:** 0.02%
- **DP Fee:** Rs. 25 per transaction
- **Capital Gains Tax:** 7.5% for individuals

## Brokerage Commission Rates (SEBON Schedule)

| Transaction Value | Commission Rate |
|-------------------|----------------|
| First Rs. 50,000 | 0.40% |
| Next Rs. 2,50,000 | 0.37% |
| Next Rs. 7,00,000 | 0.34% |
| Next Rs. 20,00,000 | 0.30% |
| Above Rs. 30,00,000 | 0.27% |

## Step-by-Step Profit Calculation

**Example:** Buy 100 shares at Rs. 250, sell at Rs. 300

1. **Total Buy Cost:** 100 × Rs. 250 = Rs. 25,000
2. **Total Sell Value:** 100 × Rs. 300 = Rs. 30,000
3. **Gross Profit:** Rs. 30,000 - Rs. 25,000 = Rs. 5,000
4. **Buy Brokerage:** Rs. 25,000 × 0.40% = Rs. 100
5. **Sell Brokerage:** Rs. 30,000 × 0.40% = Rs. 120
6. **SEBON Fee:** Rs. 30,000 × 0.015% = Rs. 4.50
7. **CDS Fee:** Rs. 30,000 × 0.02% = Rs. 6
8. **DP Fee:** Rs. 25
9. **Total Deductions:** Rs. 255.50
10. **Taxable Profit:** Rs. 5,000 - Rs. 255.50 = Rs. 4,744.50
11. **Capital Gains Tax (7.5%):** Rs. 355.84
12. **Net Profit:** Rs. 4,744.50 - Rs. 355.84 = Rs. 4,388.66

## Tips to Maximize Your Returns

1. Use NepalToolkit's Share Calculator to pre-calculate fees
2. Consider the total cost before making short-term trades
3. Long-term holdings reduce frequency of brokerage charges
4. Compare brokerage rates across different firms
5. Keep track of your capital gains for tax filing`,
  },
  {
    slug: 'emi-calculation-nepal',
    title: 'Complete Guide to EMI Calculation in Nepal',
    excerpt: 'Understand how EMI works in Nepal, the reducing balance method, typical bank interest rates, and tips to reduce your monthly loan installments.',
    category: 'Finance',
    badgeVariant: 'primary',
    emoji: '🏦',
    gradient: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 50%, #FFF1F2 100%)',
    date: 'May 28, 2026',
    author: 'NepalToolkit Team',
    content: `Whether you're planning to buy a home, vehicle, or need a personal loan, understanding EMI (Equated Monthly Installment) is essential for financial planning in Nepal.

## What is EMI?

EMI is the fixed amount you pay monthly to repay your loan over a predetermined tenure. Each EMI consists of two parts:

- **Principal Component:** The portion that reduces your outstanding loan
- **Interest Component:** The cost of borrowing

## How EMI is Calculated in Nepal

Nepali banks use the **reducing balance method** (also called diminishing balance). This means interest is calculated on the outstanding principal, not the original loan amount.

### EMI Formula:

EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)

Where:
- P = Principal loan amount
- r = Monthly interest rate (annual rate / 12)
- n = Total number of monthly installments

## Typical Loan Interest Rates in Nepal (2026)

| Loan Type | Interest Rate | Max Tenure |
|-----------|---------------|------------|
| Home Loan | 8-12% | Up to 30 years |
| Vehicle Loan | 9-14% | Up to 7 years |
| Personal Loan | 12-18% | Up to 5 years |
| Education Loan | 8-11% | Up to 10 years |
| Business Loan | 10-15% | Up to 10 years |

## Example Calculation

For a Rs. 50,00,000 home loan at 10.5% interest for 20 years:

- Monthly EMI: Rs. 49,728
- Total Payment over 20 years: Rs. 1,19,34,720
- Total Interest Paid: Rs. 69,34,720

This means you'd pay about 1.4x the original loan amount in total.

## Tips to Reduce Your EMI

1. **Increase Down Payment:** Larger down payment = smaller loan = lower EMI
2. **Compare Bank Rates:** Nabil, Global IME, Kumari, and others offer different rates
3. **Choose Right Tenure:** Longer tenure = lower EMI but more total interest
4. **Prepay When Possible:** Even small prepayments reduce principal and total interest
5. **Negotiate:** Banks often have room to offer better rates for good credit profiles

## Using NepalToolkit's EMI Calculator

Our EMI calculator provides:
- Instant EMI calculation
- Complete amortization schedule
- Year-by-year principal vs interest breakdown
- Visual representation of payment distribution`,
  },
  {
    slug: 'best-savings-accounts-nepal',
    title: 'Best Savings Accounts in Nepal 2026',
    excerpt: 'Compare interest rates, minimum balance requirements, and features of savings accounts at major Nepali banks including Nabil, Global IME, Kumari, and more.',
    category: 'Banking',
    badgeVariant: 'accent',
    emoji: '💰',
    gradient: 'linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 50%, #E0E7FF 100%)',
    date: 'May 22, 2026',
    author: 'NepalToolkit Team',
    content: `Choosing the right savings account can make a significant difference in how your money grows. Here's a comprehensive comparison of savings accounts at major Nepali banks.

## Top Savings Accounts in Nepal (2026)

### 1. Nabil Bank — Nabil Savings Plus
- **Interest Rate:** Up to 4.5% (tiered)
- **Minimum Balance:** Rs. 1,000
- **Features:** Free debit card, mobile banking, standing instructions
- **Best For:** General savings with easy access

### 2. Global IME Bank — Smart Savings
- **Interest Rate:** Up to 5.0% (tiered)
- **Minimum Balance:** Rs. 500
- **Features:** Free mobile banking, QR payment, remittance benefits
- **Best For:** Higher interest seekers

### 3. Kumari Bank — Kumari Classic Savings
- **Interest Rate:** Up to 4.25%
- **Minimum Balance:** Rs. 1,000
- **Features:** ATM access, online banking, SMS alerts
- **Best For:** Traditional banking with reliability

### 4. NMB Bank — NMB savings Plus
- **Interest Rate:** Up to 4.75%
- **Minimum Balance:** Rs. 500
- **Features:** Free debit card, mobile banking, rewards program
- **Best For:** Balance of features and returns

### 5. NIC Asia — NIC Premium Savings
- **Interest Rate:** Up to 4.5%
- **Minimum Balance:** Rs. 1,000
- **Features:** Wide branch network, remittance, mobile banking
- **Best For:** Customers needing extensive branch access

## How Savings Interest Works in Nepal

Most banks use tiered interest rates:
- Balance below Rs. 1,00,000: 2-3%
- Balance Rs. 1-5 lakh: 3-4%
- Balance above Rs. 5 lakh: 4-5%

Interest is typically calculated daily and credited quarterly.

## Tips for Maximizing Savings Returns

1. Maintain minimum balance to qualify for higher tiers
2. Set up automatic monthly transfers (standing instructions)
3. Compare rates — they change frequently
4. Consider fixed deposits for guaranteed returns
5. Use NepalToolkit's SIP calculator for investment planning

## Digital Banking Features

Most Nepali banks now offer:
- Mobile banking apps
- QR code payments (ConnectIPS, eSewa, Khalti)
- Fund transfers via NPI / NCHL
- Bill payments and recharges`,
  },
  {
    slug: 'nepal-tax-system',
    title: 'How Nepal\'s Tax System Works — Simple Guide',
    excerpt: 'Clear explanation of Nepal\'s tax system including income tax slabs, VAT, capital gains tax, and practical tips for filing taxes as an individual.',
    category: 'Finance',
    badgeVariant: 'error',
    emoji: '📋',
    gradient: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 50%, #FEE2E2 100%)',
    date: 'May 15, 2026',
    author: 'NepalToolkit Team',
    content: `Understanding Nepal's tax system is essential for every working professional and business owner. This guide breaks down the key concepts in simple terms.

## Types of Taxes in Nepal

### 1. Income Tax
Tax on your earnings from salary, business, or investments.

### 2. Value Added Tax (VAT)
13% tax on goods and services (most businesses with turnover above Rs. 50 lakh must register).

### 3. Capital Gains Tax
Tax on profits from selling assets like shares, property, or bonds.

### 4. Excise Duty
Tax on specific goods like alcohol, tobacco, and luxury items.

## Individual Income Tax Slabs (FY 2025/26)

| Taxable Income | Tax Rate |
|----------------|----------|
| Up to Rs. 5,00,000 | 1% |
| Rs. 5,00,001 to Rs. 10,00,000 | 10% |
| Rs. 10,00,001 to Rs. 20,00,000 | 20% |
| Rs. 20,00,001 to Rs. 30,00,000 | 30% |
| Above Rs. 30,00,000 | 36% |

### Rebates and Deductions:
- Rs. 75,000 deduction for insurance premiums
- Rs. 25,000 for individual provident fund
- Rs. 25,000 for children's education expenses
- Rs. 50,000 for charitable donations

## Capital Gains Tax Rates

| Investor Type | Rate |
|---------------|------|
| Individual | 7.5% |
| Institutional | 10% |
| Foreign Investors | 15% |

## How to File Taxes in Nepal

1. **Gather Documents:** PAN card, salary certificates, investment proofs
2. **Calculate Taxable Income:** Gross income minus deductions
3. **File Online:** Use the IRD Nepal website (ird.gov.np)
4. **Pay Due Amount:** Via bank or online payment
5. **Keep Records:** Maintain receipts for 5 years

## Common Tax Mistakes to Avoid

1. Not reporting all income sources
2. Missing filing deadlines (mid-July each year)
3. Not claiming eligible deductions
4. Confusing cash basis vs accrual basis
5. Not updating PAN details

## Tax Planning Tips

1. Invest in tax-saving instruments (insurance, provident fund)
2. Maintain proper books of accounts
3. Consult a tax professional for complex situations
4. Use NepalToolkit's financial calculators for planning
5. File early to avoid penalties`,
  },
];

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs() {
  return posts.map((p) => p.slug);
}
