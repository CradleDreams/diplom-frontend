import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

const userAnalyticsData = [
  { month: "Jan", newUsers: 120, activeUsers: 340 },
  { month: "Feb", newUsers: 190, activeUsers: 420 },
  { month: "Mar", newUsers: 230, activeUsers: 510 },
  { month: "Apr", newUsers: 210, activeUsers: 480 },
  { month: "May", newUsers: 280, activeUsers: 590 },
  { month: "Jun", newUsers: 320, activeUsers: 650 },
];

const videoStatusData = [
  { name: "Ready", value: 245 },
  { name: "Processing", value: 32 },
  { name: "Created", value: 18 },
];

const genreDistributionData = [
  { name: "Education", videos: 120 },
  { name: "Entertainment", videos: 85 },
  { name: "Technology", videos: 65 },
  { name: "Science", videos: 45 },
  { name: "Other", videos: 30 },
];

const videoPerformanceData = [
  { title: "Video 1", views: 1200, engagement: 78, duration: 15 },
  { title: "Video 2", views: 980, engagement: 82, duration: 12 },
  { title: "Video 3", views: 1560, engagement: 91, duration: 18 },
  { title: "Video 4", views: 750, engagement: 65, duration: 10 },
  { title: "Video 5", views: 2100, engagement: 88, duration: 22 },
];

const userActivityData = [
  { hour: "00:00", activity: 12 },
  { hour: "03:00", activity: 5 },
  { hour: "06:00", activity: 28 },
  { hour: "09:00", activity: 120 },
  { hour: "12:00", activity: 210 },
  { hour: "15:00", activity: 180 },
  { hour: "18:00", activity: 250 },
  { hour: "21:00", activity: 190 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const Analytics: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const stats = [
    { title: "Total Users", value: "1,842", change: "+12%" },
    { title: "Active Videos", value: "295", change: "+5%" },
    { title: "Processing Videos", value: "32", change: "-3%" },
    { title: "Avg. Engagement", value: "78%", change: "+2%" },
  ];

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Video Platform Analytics
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="subtitle2" color="textSecondary">
                {stat.title}
              </Typography>
              <Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>
                {stat.value}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  color: stat.change.startsWith("+")
                    ? "success.main"
                    : "error.main",
                }}
              >
                {stat.change} from last month
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 400, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              User Growth
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={userAnalyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="newUsers"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
                <Area
                  type="monotone"
                  dataKey="activeUsers"
                  stackId="2"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 400, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Video Status Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={videoStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {videoStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 400, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Content by Genre
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={genreDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="videos" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 400, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              User Activity by Hour
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="activity"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Top Performing Videos
        </Typography>
        <Box sx={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: theme.palette.grey[100] }}>
                <th style={{ padding: "12px", textAlign: "left" }}>Title</th>
                <th style={{ padding: "12px", textAlign: "right" }}>Views</th>
                <th style={{ padding: "12px", textAlign: "right" }}>
                  Engagement
                </th>
                <th style={{ padding: "12px", textAlign: "right" }}>
                  Duration (min)
                </th>
              </tr>
            </thead>
            <tbody>
              {videoPerformanceData.map((video, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  <td style={{ padding: "12px" }}>{video.title}</td>
                  <td style={{ padding: "12px", textAlign: "right" }}>
                    {video.views.toLocaleString()}
                  </td>
                  <td style={{ padding: "12px", textAlign: "right" }}>
                    <Box
                      sx={{
                        display: "inline-block",
                        p: "2px 8px",
                        borderRadius: 1,
                        backgroundColor:
                          video.engagement > 85
                            ? theme.palette.success.light
                            : video.engagement > 70
                              ? theme.palette.warning.light
                              : theme.palette.error.light,
                      }}
                    >
                      {video.engagement}%
                    </Box>
                  </td>
                  <td style={{ padding: "12px", textAlign: "right" }}>
                    {video.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Paper>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 300, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Subtitles Usage
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", height: "80%" }}>
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <Typography variant="h3" color="primary">
                  78%
                </Typography>
                <Typography variant="body1">
                  of videos have subtitles
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Top Languages:
                </Typography>
                <Typography>English (100%)</Typography>
                <Typography>Spanish (45%)</Typography>
                <Typography>French (32%)</Typography>
                <Typography>German (28%)</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 300, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Timestamps Analysis
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", height: "80%" }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Videos with timestamps have <strong>42% higher</strong>{" "}
                  engagement
                </Typography>
                <Typography variant="body1">
                  Average of <strong>8.7 timestamps</strong> per video
                </Typography>
              </Box>
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <Typography variant="h3" color="secondary">
                  +42%
                </Typography>
                <Typography variant="body1">engagement boost</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
