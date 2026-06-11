import { useEffect, useState } from "react";
import api from "../api";

function AuctionCard() {
  const USER_ID = "6a2a92f75a78b954ee8db307";
  const AUCTION_ID = "6a2a92f75a78b954ee8db308";

  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [message, setMessage] = useState("");

  const fetchAuction = async () => {
    try {
      const res = await api.get(
        `/auction/${AUCTION_ID}`
      );

      setAuction(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAuction();
  }, []);

  const placeBid = async () => {
    try {
      const res = await api.post("/bid", {
        userId: USER_ID,
        auctionId: AUCTION_ID,
        bidAmount: Number(bidAmount),
      });

      setMessage(res.data.message);

      fetchAuction();

      setBidAmount("");
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  if (!auction) {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      style={{
        width: "400px",
        margin: "50px auto",
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h2>{auction.title}</h2>

      <p>
        Starting Bid: ₹{auction.startingBid}
      </p>

      <p>
        Current Bid: ₹{auction.currentBid}
      </p>

      <p>
        Status:{" "}
        {auction.sold ? "Sold" : "Available"}
      </p>

      <input
        type="number"
        placeholder="Enter bid"
        value={bidAmount}
        onChange={(e) =>
          setBidAmount(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={placeBid}>
        Place Bid
      </button>

      <p>{message}</p>
    </div>
  );
}

export default AuctionCard;