import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DataChart = () => {
  // Sample data for category chart
  const categoryData = [
    { name: 'PNJ', value: 45 },
    { name: 'PTK', value: 68 },
    { name: 'PKS', value: 34 },
    { name: 'PPA', value: 52 },
    { name: 'IPK', value: 28 },
    { name: 'PUP', value: 41 },
    { name: 'PKP', value: 37 },
    { name: 'KDK', value: 29 },
    { name: 'DTM', value: 55 },
  ];

  // Sample data for year chart
  const yearData = [
    { name: '2020', total: 120, available: 85, unavailable: 35 },
    { name: '2021', total: 180, available: 135, unavailable: 45 },
    { name: '2022', total: 240, available: 190, unavailable: 50 },
    { name: '2023', total: 310, available: 260, unavailable: 50 },
    { name: '2024', total: 348, available: 310, unavailable: 38 },
  ];

  // Sample data for priority chart
  const priorityData = [
    { name: 'Prioritas', value: 75 },
    { name: 'Non Prioritas', value: 60 },
    { name: 'SDGs', value: 45 },
    { name: 'SPM', value: 30 },
    { name: 'Lainnya', value: 25 },
  ];

  const COLORS = ['#2C7A7B', '#4FD1C5', '#FFDD00', '#718096', '#E53E3E'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box bg="white" p={3} borderRadius="md" boxShadow="md" border="1px solid" borderColor="gray.200">
          <Text fontWeight="bold" color="teal.700">{label}</Text>
          {payload.map((entry, index) => (
            <Text key={index} color={entry.color}>
              {entry.name}: {entry.value}
            </Text>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <Box py={16}>
      <Box maxW="container.xl" mx="auto" px={4}>
        <Heading as="h2" size="lg" textAlign="center" mb={2} color="teal.800">
          Grafik Jumlah Banyaknya Data
        </Heading>
        <Text textAlign="center" color="gray.600" mb={12}>
          Visualisasi data berdasarkan kategori dan tahun
        </Text>

        {/* Category Chart */}
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md" mb={12}>
          <Heading as="h3" size="md" mb={6} color="teal.700">
            Per Kategori Sektoral
          </Heading>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={categoryData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="value" name="Jumlah Dataset" fill="#2C7A7B" />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Year Chart */}
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md" mb={12}>
          <Heading as="h3" size="md" mb={6} color="teal.700">
            Per Tahun
          </Heading>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={yearData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="total" name="Total Data" fill="#2C7A7B" />
              <Bar dataKey="available" name="Data Tersedia" fill="#4FD1C5" />
              <Bar dataKey="unavailable" name="Data Belum Tersedia" fill="#FF6B6B" />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Priority Chart */}
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
          <Heading as="h3" size="md" mb={6} color="teal.700">
            Distribusi Data Berdasarkan Prioritas
          </Heading>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={priorityData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default DataChart;