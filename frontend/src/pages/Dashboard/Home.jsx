import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/ApiPaths'
import { useUserAuth } from '../../hooks/useUserAuth'
import InfoCard from '../../components/Cards/InfoCard'

import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu'
import { IoMdCard } from 'react-icons/io'
import { addThousandsSeparator } from '../../utils/Helper'
import { useNavigate } from 'react-router-dom'
import RecentTransactions from '../../components/Dashboard/RecentTransactions'
import FinanceOverView from '../../components/Dashboard/FinanceOverView'
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions'
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses'
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart'
import RecentIncome from '../../components/Dashboard/RecentIncome'

const Home = () => {
  useUserAuth()

  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)
  

  // console.log("DashboardData Expense : ", dashboardData);
  

  const Navigate = useNavigate()

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`)

        if (response.data) {
          setDashboardData(response.data)
        }
    }
    catch (err) {
      console.log('Something went wrong. Please try again.', err);
      
    }
    finally {
      setLoading(false)
    }
  }


  useEffect(()=> {
    fetchDashboardData()
    return () => {};

  },[])

  return (
    <>
    <DashboardLayout activeMenu='Dashboard'>
      <div className='my-5 mx-auto'>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard 
        icon={<IoMdCard />}
        label='Total Balance'
        value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
        color='bg-primary'
        />
        <InfoCard 
        icon={<LuWalletMinimal />}
        label='Total Income'
        value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
        color='bg-orange-500'
        />
        <InfoCard 
        icon={<LuHandCoins />}
        label='Total Expense'
        value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
        color='bg-red-500'
        />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions 
          transactions={dashboardData?.recentTransactions}
          onSeeMore={()=> Navigate('/expense')}
          />

          <FinanceOverView
          totalBalance={dashboardData?.totalBalance || 0 }
          totalIncome={dashboardData?.totalIncome || 0 }
          totalExpense={dashboardData?.totalExpense || 0 }
           />

           <ExpenseTransactions 
           transactions={dashboardData?.last30DaysExpense?.transaction || []}
           onSeeMore={() => Navigate("/expense")}
           />
           <Last30DaysExpenses 
           data={dashboardData?.last30DaysExpense?.transaction || []}
           />

           <RecentIncomeWithChart 
              data={dashboardData?.last60DaysIncome?.transaction?.slice(0,4) || []}
              totalIncome={dashboardData?.totalIncome || 0}

           />

           <RecentIncome 
              transaction = {dashboardData?.last60DaysIncome?.transaction || []}
              onSeeMore={() => Navigate("/income")}
           />

           
        </div>
      </div>
    </DashboardLayout>
    </>
  )
}

export default Home