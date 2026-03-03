// this page is intentionally fake but we give the impression of a scrolling news feed
import { useNavigate } from "react-router-dom";
import BollywoodCard from "../components/bollywood/BollywoodCard.jsx";
import { useRef, useState } from "react";

function LongPressDot({ onActivate }) {
  const timerRef = useRef();
  const [holding, setHolding] = useState(false);

  const start = () => {
    setHolding(true);
    timerRef.current = setTimeout(onActivate, 3000);
  };
  const cancel = () => {
    setHolding(false);
    clearTimeout(timerRef.current);
  };

  // render an almost invisible area (transparent 1px square) so it can't be noticed
  return (
    <button
      aria-label="secret"
      onMouseDown={start}
      onMouseUp={cancel}
      onMouseLeave={cancel}
      onTouchStart={start}
      onTouchEnd={cancel}
      className="h-6 w-18 bg-mist-900"
      // style={{ WebkitTapHighlightColor: "transparent", opacity: 0 }}
    />
  );
}

const articles = [
  {
    title: "Star couple spotted at airport",
    tag: "Trending",
    image: "https://www.shutterstock.com/image-vector/bollywood-indian-cinema-movie-banner-600nw-2524335017.jpg",
    summary: "Fans gathered as celebrity pair made a surprise arrival in Mumbai.",
  },
  {
    title: "New teaser breaks internet",
    tag: "Exclusive",
    image: "https://s45468.pcdn.co/wp-content/uploads/2022/04/socialmediabanner1.jpeg",
    summary: "The anticipation for the upcoming action movie has gone viral.",
  },
  {
    title: "Top 10 Bollywood songs this week",
    tag: "Music",
    image: "https://images.moneycontrol.com/static-mcnews/2024/12/20241231124530_yearender.jpg?impolicy=website&width=770&height=431",
    summary: "From chartbusters to indie hits, here's what the nation is listening to.",
  },
  {
    title: "Director reveals behind-the-scenes stories",
    tag: "Insider",
    image: "https://www.filmdistrictindia.com/assets/images/blog_images/5-distinguishing-features-of-bollywood-movies.jpg",
    summary: "A candid chat with the filmmaker on his most polarizing scenes.",
  },
  {
    title: "Fashion week: celebrities’ street style",
    tag: "Fashion",
    image: "https://www.koimoi.com/wp-content/new-galleries/2025/12/8-highly-educated-bollywood-actors-01.jpg",
    summary: "Glamour, glitz, and the odd wardrobe malfunction on the ramps.",
  },
  {
    title: "Award season predictions",
    tag: "Opinion",
    image: "https://t3.ftcdn.net/jpg/02/51/11/56/360_F_251115658_qdOPyuraxekcHlooDi4yCPsW9NlPU2GB.jpg",
    summary: "Our critics pick the likely winners before the ceremony.",
  }
];

export default function BollywoodHome() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      <header className="px-4 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="text-lg font-semibold tracking-wide">BollywoodBuzz</div>

      </header>

      <main className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
        {articles.map((a, idx) => (
          <BollywoodCard
            key={idx}
            title={a.title}
            tag={a.tag}
            image={a.image}
            summary={a.summary}
          />
        ))}

        {/* secret dot positioned after final article */}
        <div className="flex justify-center bg-transparent ">
          <LongPressDot onActivate={() => nav("/secret")} />
        </div>
      </main>
    </div>
  );
}