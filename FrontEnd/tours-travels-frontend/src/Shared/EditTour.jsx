import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchPut from "../hooks/useFetchPut";

const EditTour = () => {
  const { id, title, price, city } = useParams();
  const [tourtitle, settourtitle] = useState(title);
  const [tourprice, settourprice] = useState(price);
  const [tourcity, settourcity] = useState(city);
  const { data: updatedTour, loading, error, updateData } = useFetchPut();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(`tours/${id}`, id, { title: tourtitle, price: tourprice, city: tourcity });
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" value={tourtitle} onChange={(e) => settourtitle(e.target.value)} />
          <input type="number" value={tourprice} onChange={(e) => settourprice(e.target.value)} />
          <input type="text" value={tourcity} onChange={(e) => settourcity(e.target.value)} />
          <input type="submit" value="Edit" />
        </form>
      </div>
    </>
  );
};

export default EditTour;
