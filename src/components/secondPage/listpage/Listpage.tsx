import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "./Listpage.module.css";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const List = () => {
  const [data, setdata] = useState<Post[]>([]);

  const fetching = async () => {
    try {
      const response = await axios.get<Post[]>(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setdata(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetching();
  }, []);

  const columns: GridColDef[] = [
    { field: "userId", headerName: "User ID", width: 100 },
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "body", headerName: "Body", width: 500 },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.title}>List is here</div>
      <div className={styles.container}>
        <DataGrid rows={data} columns={columns} />
      </div>
    </div>
  );
};
