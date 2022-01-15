import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase/config';

// firebase imports
import { collection, onSnapshot, query, where } from 'firebase/firestore';

export const useCollection = (name, _q) => {
  const [data, setData] = useState(null);

  // query setup
  const q = useRef(_q).current;

  useEffect(() => {
    let ref = collection(db, name);

    if (q) {
      ref = query(ref, where(...q));
    }

    const unsub = onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) =>
        results.push({ id: doc.id, ...doc.data() })
      );
      setData(results);
    });

    return () => unsub();
  }, [name, q]);

  return { data };
};
