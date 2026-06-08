import { useEffect, useState } from "react";
import API from "../api/axiosInstance";

export default function StudyCenterList() {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    API.get("/public/franchise")
      .then((res) => {
        setCenters(res.data?.data || []);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-4">
        Approved Study Centers
      </h2>

      {loading && <p className="text-center">Loading...</p>}

      {!loading && error && (
        <p className="text-center text-danger">
          Failed to load study centers. Please try again later.
        </p>
      )}

      {!loading && !error && centers.length === 0 && (
        <p className="text-center text-muted">
          No study centers available.
        </p>
      )}

      <div className="row">
        {centers.map((f) => (
          <div key={f._id} className="col-md-4 mb-3">
            <div className="card shadow-sm p-3 h-100">
              <h5>{f.instituteName}</h5>
              <div className="text-muted small">{f.instituteId}</div>
              <div>
                {f.district}, {f.state}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
