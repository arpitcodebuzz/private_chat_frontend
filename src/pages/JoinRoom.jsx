import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../utils/api";
import { useAppStore } from "../store/useAppStore";
import useSessionLock from "../hooks/useSessionLock";

export default function JoinRoom() {
  useSessionLock(true);

  const nav = useNavigate();
  const setRoom = useAppStore((s) => s.setRoom);
  const setNickname = useAppStore((s) => s.setNickname);

  // if the user hasn't passed the secret access check, send them back
  useEffect(() => {
    try {
      if (sessionStorage.getItem("access-granted") !== "1") {
        nav("/", { replace: true });
      }
    } catch {}
  }, [nav]);

  const [name, setName] = useState("");
  const [rawPassword, setRawPassword] = useState("");
  const [nickname, setNick] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setErr("");
    setLoading(true);
    try {
      const res = await apiPost("/api/rooms/join", { name, rawPassword, nickname });
      const { roomId, roomName, displayName } = res.data;
      setRoom(roomId, roomName);
      setNickname(displayName);
      nav(`/chat/${roomId}`);
    } catch (e) {
      console.error(e);
      setErr(e.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-4 py-6">
      <div className="max-w-md mx-auto">
        <div className="text-xl font-semibold">Join Room</div>

        <div className="mt-5 space-y-3">
          <input
            className="w-full rounded-xl bg-neutral-900 border border-white/10 px-3 py-2"
            placeholder="Room Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full rounded-xl bg-neutral-900 border border-white/10 px-3 py-2"
            placeholder="Raw Password"
            type="password"
            value={rawPassword}
            onChange={(e) => setRawPassword(e.target.value)}
          />

          <input
            className="w-full rounded-xl bg-neutral-900 border border-white/10 px-3 py-2"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNick(e.target.value)}
          />

          {err ? <div className="text-sm text-red-400">{err}</div> : null}

          <button
            onClick={submit}
            disabled={loading}
            className="w-full rounded-xl bg-white text-neutral-950 px-3 py-2 font-medium"
          >
            {loading ? "Please wait..." : "Join"}
          </button>

          <button
            onClick={() => nav("/create")}
            className="w-full rounded-xl border border-white/10 px-3 py-2"
          >
            Create a new room
          </button>
        </div>
      </div>
    </div>
  );
}