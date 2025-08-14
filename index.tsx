import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, Globe, DollarSign, Users, ShoppingCart } from 'lucide-react';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [revenue, setRevenue] = useState(89216);
  const [metric1, setMetric1] = useState(108355);
  const [metric2, setMetric2] = useState(5370);
  const [trendData, setTrendData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [scatterData, setScatterData] = useState([]);

  // Initialize data
  useEffect(() => {
    const initialTrendData = Array.from({ length: 12 }, (_, i) => ({
      name: `${i + 1}`,
      metric1: Math.floor(Math.random() * 1000) + 500,
      metric2: Math.floor(Math.random() * 800) + 300,
      metric3: Math.floor(Math.random() * 600) + 200
    }));

    const initialBarData = Array.from({ length: 15 }, (_, i) => ({
      name: `${i + 1}`,
      value: Math.floor(Math.random() * 100) + 20
    }));

    const initialPieData = [
      { name: 'Segment 1', value: 35, color: '#3B82F6' },
      { name: 'Segment 2', value: 34, color: '#60A5FA' },
      { name: 'Segment 3', value: 31, color: '#93C5FD' }
    ];

    const initialScatterData = Array.from({ length: 20 }, () => ({
      x: Math.floor(Math.random() * 80000) + 10000,
      y: Math.floor(Math.random() * 60000) + 10000,
      z: Math.floor(Math.random() * 100) + 20
    }));

    setTrendData(initialTrendData);
    setBarData(initialBarData);
    setPieData(initialPieData);
    setScatterData(initialScatterData);
  }, []);

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      
      // Update metrics with small random changes
      setRevenue(prev => prev + Math.floor(Math.random() * 200) - 100);
      setMetric1(prev => prev + Math.floor(Math.random() * 100) - 50);
      setMetric2(prev => prev + Math.floor(Math.random() * 50) - 25);

      // Update trend data
      setTrendData(prev => {
        const newData = [...prev];
        newData.shift();
        newData.push({
          name: `${parseInt(newData[newData.length - 1]?.name || '0') + 1}`,
          metric1: Math.floor(Math.random() * 1000) + 500,
          metric2: Math.floor(Math.random() * 800) + 300,
          metric3: Math.floor(Math.random() * 600) + 200
        });
        return newData;
      });

      // Update bar data
      setBarData(prev => prev.map(item => ({
        ...item,
        value: Math.max(10, item.value + Math.floor(Math.random() * 20) - 10)
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">Dashboard Title</h1>
          <p className="text-slate-300 mb-4">Dashboard subheading or one-liner</p>
          <p className="text-sm text-slate-400 max-w-md">
            A little more context and information about what you're covering 
            in your dashboard and any critical context people need to understand it.
          </p>
        </div>
        
        {/* World Map Placeholder */}
        <div className="relative bg-slate-800 rounded-lg p-6 mx-8 flex-1">
          <Globe className="w-full h-32 text-slate-600" />
          <div className="absolute top-4 right-4 text-right">
            <div className="text-xs text-slate-400">Revenue</div>
            <div className="text-lg font-semibold">$24,000</div>
          </div>
        </div>

        {/* Main Metric */}
        <div className="text-right">
          <div className="mb-2">
            <TrendingUp className="w-8 h-8 text-green-400 inline-block mb-2" />
          </div>
          <div className="text-3xl font-bold">${formatNumber(revenue)}</div>
          <div className="text-slate-400 text-sm">Top-level Metric</div>
          <div className="text-xs text-slate-500 mt-2">
            Last updated: {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Main Chart */}
        <div className="col-span-8 bg-slate-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">A big section for metrics that need room to breathe</h3>
          <p className="text-slate-400 text-sm mb-6">
            A little more context and information about what you're covering. Note: please 
            add labels to your data, I've skipped them here because this is a placeholder 
            data, but you will need them for your real data when you build your dashboard.
          </p>

          <div className="grid grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center mt-2">
                <div className="text-2xl font-bold">${formatNumber(revenue)}</div>
                <div className="text-slate-400 text-sm">Total</div>
              </div>
            </div>

            {/* Trend Lines */}
            <div className="space-y-4">
              <div>
                <div className="text-sm text-slate-400 mb-2">Dimension/metric 1</div>
                <ResponsiveContainer width="100%" height={40}>
                  <LineChart data={trendData.slice(-8)}>
                    <Line type="monotone" dataKey="metric1" stroke="#3B82F6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-2">Dimension/metric 2</div>
                <ResponsiveContainer width="100%" height={40}>
                  <LineChart data={trendData.slice(-8)}>
                    <Line type="monotone" dataKey="metric2" stroke="#60A5FA" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-2">Dimension/metric 3</div>
                <ResponsiveContainer width="100%" height={40}>
                  <LineChart data={trendData.slice(-8)}>
                    <Line type="monotone" dataKey="metric3" stroke="#93C5FD" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Area Chart */}
          <div className="mt-6">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }} 
                />
                <Line type="monotone" dataKey="metric1" stroke="#3B82F6" strokeWidth={3} fill="#3B82F6" fillOpacity={0.3} />
                <Line type="monotone" dataKey="metric2" stroke="#60A5FA" strokeWidth={3} fill="#60A5FA" fillOpacity={0.2} />
                <Line type="monotone" dataKey="metric3" stroke="#93C5FD" strokeWidth={3} fill="#93C5FD" fillOpacity={0.1} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-4 space-y-6">
          {/* Metric Cards */}
          <div className="bg-slate-800 rounded-lg p-4">
            <h4 className="font-semibold mb-1">Another important metric</h4>
            <p className="text-slate-400 text-sm mb-3">Secondary info, if you need it</p>
            <div className="text-2xl font-bold mb-3">{formatNumber(metric1)}</div>
            <ResponsiveContainer width="100%" height={60}>
              <BarChart data={barData.slice(-10)}>
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <h4 className="font-semibold mb-1">One more important metric</h4>
            <p className="text-slate-400 text-sm mb-3">Secondary info, if you need it</p>
            <div className="text-2xl font-bold mb-3">{formatNumber(metric2)}</div>
            <ResponsiveContainer width="100%" height={60}>
              <BarChart data={barData.slice(-12)}>
                <Bar dataKey="value" fill="#60A5FA" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Scatter Plot Section */}
          <div className="bg-slate-800 rounded-lg p-4">
            <h4 className="font-semibold mb-1">Do you have a chart that needs some explanation?</h4>
            <p className="text-slate-400 text-sm mb-4">
              It's nice to have a section with plenty of room for context and explanation. 
              Some charts aren't easy to interpret unless you have some guidance. Kind of like 
              this one which highlights campaigns with big budgets and big returns on ad spend.
            </p>
            
            <ResponsiveContainer width="100%" height={200}>
              <ScatterChart data={scatterData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  domain={['dataMin', 'dataMax']} 
                  stroke="#9CA3AF"
                  tick={{ fontSize: 10 }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  domain={['dataMin', 'dataMax']} 
                  stroke="#9CA3AF"
                  tick={{ fontSize: 10 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }} 
                />
                <Scatter 
                  dataKey="z" 
                  fill="#3B82F6" 
                  fillOpacity={0.7}
                />
              </ScatterChart>
            </ResponsiveContainer>

            <div className="mt-3 flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Jackets</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-400 rounded"></div>
                <span>Shoes</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-300 rounded"></div>
                <span>Wearables</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="mt-6 flex justify-between items-center text-xs text-slate-500">
        <div className="flex items-center gap-4">
          <span>Light Theme</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Live Data Connected</span>
          </div>
        </div>
        <div>Last refresh: {currentTime.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
