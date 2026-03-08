import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TopImpactTableProps {
  data: { area: string; groupCount: number }[]
}

export function TopImpactTable({ data }: TopImpactTableProps) {
  const maxCount = Math.max(...data.map((d) => d.groupCount), 1)

  return (
    <Card className="bg-card/50 backdrop-blur-md border-white/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Most Impacted Areas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {data.map((item, i) => (
            <div key={item.area}>
              {i > 0 && <Separator className="opacity-20" />}
              <div className="flex items-center gap-3 py-2.5">
                <span className="w-6 text-sm font-medium text-muted-foreground tabular-nums text-right">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-medium truncate">{item.area}</span>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {item.groupCount} groups
                    </Badge>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all"
                      style={{ width: `${(item.groupCount / maxCount) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
