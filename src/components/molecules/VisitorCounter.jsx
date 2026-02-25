"use client";

import { useEffect, useState } from "react";

const VisitorCounter = () => {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const namespace = "ayesha-portfolio";
        const key = "visits";
        const hasVisited = sessionStorage.getItem("hasVisited");
        
        let url = `https://api.counterapi.dev/v1/${namespace}/${key}/up`;

        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data.count) {
            setCount(data.count);
            if (!hasVisited) {
                sessionStorage.setItem("hasVisited", "true");
            }
        }
      } catch (error) {
        console.error("Error fetching visitor count:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  if (loading || count === null) return null;

  return (
    <div className="visitor-counter flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-xs font-medium text-gray-300 select-none">
        <span className="flex h-1.5 w-1.5">
          <span className="rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
        </span>
        <span className="tracking-[0.1em]">
            VISITS <span className="text-cyan-400  font-medium ml-1">{count.toLocaleString()}</span>
        </span>
    </div>
  );
};

export default VisitorCounter;
