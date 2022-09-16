import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";

export const formatLastMessageTimestamp = (timestamp: number): string => {
  const date = format(new Date(timestamp), "dd MMM", { locale: frLocale });

  return date;
};
