import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type DashboardBadgeProps = {
  title: string;
  description?: string;
  stats?: {
    length: number;
  };
  isLoading: boolean;
};

export const DashboardBadge = ({
  isLoading,
  ...props
}: DashboardBadgeProps) => {
  return (
    <Card className="w-full space-y-4">
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        {props.description && (
          <CardDescription>{props.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-4 w-full" />
        ) : (
          <p>Total : {props.stats?.length + " " + props.title} </p>
        )}
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
};
