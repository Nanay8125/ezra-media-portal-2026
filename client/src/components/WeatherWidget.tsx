import { useState, useEffect } from "react";
import { Cloud, CloudRain, Sun, CloudLightning, Loader2 } from "lucide-react";

export default function WeatherWidget() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        // Default to Kumasi, Ghana (Latitude: 6.6666, Longitude: -1.6163)
        // Using open-meteo free API
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=6.6666&longitude=-1.6163&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto"
        );
        const data = await response.json();
        setWeather(data.current);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch weather:", error);
        setLoading(false);
      }
    }

    fetchWeather();
    // Refresh weather every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="flex items-center gap-1.5 opacity-60">
      <Loader2 className="w-3 h-3 animate-spin text-primary" />
      <span className="text-[10px] uppercase font-bold tracking-wider">Loading...</span>
    </div>
  );
  
  if (!weather) return null;

  const getWeatherIcon = (code: number) => {
    // Weather codes: 0-1 Clear, 2-3 Cloudy, 51-67 Rain, 95-99 Thunderstorm
    if (code <= 1) return <Sun className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500/20" />;
    if (code <= 3) return <Cloud className="w-3.5 h-3.5 text-blue-400 fill-blue-400/10" />;
    if (code <= 65) return <CloudRain className="w-3.5 h-3.5 text-blue-600" />;
    if (code <= 99) return <CloudLightning className="w-3.5 h-3.5 text-primary" />;
    return <Cloud className="w-3.5 h-3.5 text-muted-foreground" />;
  };

  const getWeatherText = (code: number) => {
    if (code <= 1) return "Sunny";
    if (code <= 3) return "Cloudy";
    if (code <= 65) return "Rainy";
    if (code <= 99) return "Stormy";
    return "Clear";
  };

  return (
    <div className="flex items-center gap-2.5 animate-in fade-in slide-in-from-left-2 duration-700">
      <div className="flex items-center gap-1.5">
        <div className="bg-background/80 p-0.5 rounded-sm shadow-sm border border-border/20">
          {getWeatherIcon(weather.weather_code)}
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-[11px] font-black text-foreground">{Math.round(weather.temperature_2m)}°C</span>
          <span className="text-[8px] uppercase font-bold text-muted-foreground tracking-tighter">{getWeatherText(weather.weather_code)}</span>
        </div>
      </div>
      
      <div className="h-4 w-[1px] bg-border/40 mx-1"></div>
      
      <div className="flex flex-col leading-none">
        <span className="text-[8px] uppercase font-black text-primary tracking-widest leading-none">Kumasi</span>
        <span className="text-[9px] font-bold text-foreground leading-none">Ghana</span>
      </div>
    </div>
  );
}
