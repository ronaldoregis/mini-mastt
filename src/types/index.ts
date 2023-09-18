type IncomeStatementsResponse = {
  data: IncomeStatement
}

type IncomeStatement = {
  symbol: "IBM",
  annualReports: IncomeStatementReport[],
  quarterlyReports: IncomeStatementReport[]
}

type IncomeStatementReport = {
  fiscalDateEnding: String,
  grossProfit: String,
  totalRevenue: String,
  incomeBeforeTax: String,
  operatingExpenses: String
}

export type { IncomeStatementsResponse, IncomeStatementReport }
