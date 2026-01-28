import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#0088fe",
];

export interface ChartData {
  type: "bar" | "line" | "pie" | "area";
  title: string;
  data: Array<Record<string, string | number>>;
  xKey?: string;
  yKey?: string;
  dataKeys?: string[];
}

interface ChartRendererProps {
  chart: ChartData;
}

export function ChartRenderer({ chart }: ChartRendererProps) {
  const { type, title, data, xKey = "name", yKey = "value", dataKeys } = chart;

  const keys = dataKeys || (data.length > 0 ? Object.keys(data[0]).filter(k => k !== xKey) : [yKey]);

  return (
    <Card className="my-4" data-testid="chart-container">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {type === "bar" ? (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey={xKey} tick={{ fontSize: 12 }} className="text-muted-foreground" />
                <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--popover))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                    color: "hsl(var(--popover-foreground))"
                  }} 
                />
                <Legend />
                {keys.map((key, index) => (
                  <Bar key={key} dataKey={key} fill={COLORS[index % COLORS.length]} radius={[4, 4, 0, 0]} />
                ))}
              </BarChart>
            ) : type === "line" ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey={xKey} tick={{ fontSize: 12 }} className="text-muted-foreground" />
                <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--popover))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                    color: "hsl(var(--popover-foreground))"
                  }} 
                />
                <Legend />
                {keys.map((key, index) => (
                  <Line key={key} type="monotone" dataKey={key} stroke={COLORS[index % COLORS.length]} strokeWidth={2} dot={{ r: 4 }} />
                ))}
              </LineChart>
            ) : type === "area" ? (
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey={xKey} tick={{ fontSize: 12 }} className="text-muted-foreground" />
                <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--popover))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                    color: "hsl(var(--popover-foreground))"
                  }} 
                />
                <Legend />
                {keys.map((key, index) => (
                  <Area key={key} type="monotone" dataKey={key} fill={COLORS[index % COLORS.length]} stroke={COLORS[index % COLORS.length]} fillOpacity={0.3} />
                ))}
              </AreaChart>
            ) : (
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  dataKey={yKey}
                  nameKey={xKey}
                >
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--popover))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                    color: "hsl(var(--popover-foreground))"
                  }} 
                />
                <Legend />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function parseChartFromContent(content: string): { text: string; charts: ChartData[] } {
  const chartPattern = /```chart\s*([\s\S]*?)```/g;
  const charts: ChartData[] = [];
  let text = content;

  let match;
  while ((match = chartPattern.exec(content)) !== null) {
    try {
      const chartJson = match[1].trim();
      const chartData = JSON.parse(chartJson) as ChartData;
      if (chartData.type && chartData.data && Array.isArray(chartData.data)) {
        charts.push(chartData);
      }
    } catch (e) {
      console.error("Failed to parse chart:", e);
    }
  }

  text = content.replace(chartPattern, "").trim();

  return { text, charts };
}
