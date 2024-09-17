import { useState, useEffect } from "react"

const Footer = () => {
    
      const [date, setDate] = useState(new Date());
    
      useEffect(() => {
        const intervalId = setInterval(() => {
          setDate(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
      }, []);
    
      const formattedDate = date.toLocaleDateString();
    
      return (
        <div>
          <h3>Today's date: {formattedDate}</h3>
        </div>
      );
    
}

export default Footer