import { useEffect, useState } from "react";
import { api } from "../api/client";

type Item = {
  id: string;
  name: string;
};

export const MasterPage = () => {
  const [type, setType] = useState<"payment" | "category">("payment");
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");

  const endpoint =
    type === "payment" ? "/payment-methods" : "/categories";

  const fetchData = async () => {
    const res = await api.get(endpoint);
    setItems(res.data.data);
  };

    useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
        const res = await api.get(endpoint);
        if (isMounted) {
        setItems(res.data.data);
        }
    };

    fetchData();

    return () => {
        isMounted = false;
    };
    }, [endpoint]);

  const handleAdd = async () => {
    await api.post(endpoint, { name });
    setName("");
    fetchData();
  };

  const handleDelete = async (id: string) => {
    await api.delete(`${endpoint}/${id}`);
    fetchData();
  };

  return (
    <div>
      {/* 切り替え */}
      <button onClick={() => setType("payment")}>支払方法</button>
      <button onClick={() => setType("category")}>カテゴリ</button>

      {/* 一覧 */}
      {items.map((item) => (
        <div key={item.id}>
          {item.name}
          <button onClick={() => handleDelete(item.id)}>削除</button>
        </div>
      ))}

      {/* 追加 */}
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleAdd}>追加</button>
    </div>
  );
};