/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import GlobalLangConfig from './pages/GlobalLangConfig';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Cases from './pages/Cases';
import Scenarios from './pages/Scenarios';
import Company from './pages/Company';
import News from './pages/News';
import FAQ from './pages/FAQ';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'global-lang':
        return <GlobalLangConfig />;
      case 'products':
        return <Products />;
      case 'categories':
        return <Categories />;
      case 'cases':
        return <Cases />;
      case 'scenarios':
        return <Scenarios />;
      case 'company':
        return <Company />;
      case 'news':
        return <News />;
      case 'faq':
        return <FAQ />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

