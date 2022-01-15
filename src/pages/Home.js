import BookList from '../components/BookList';
import BookForm from '../components/BookForm';
import { useCollection } from '../hooks/useCollection';
import { useAuthContext } from '../context/useAuthContext';

export default function Home() {
  const { user } = useAuthContext();

  const { data: books } = useCollection('books', ['uid', '==', user.uid]);

  return (
    <div className="App">
      {books && <BookList books={books} />}
      <BookForm />
    </div>
  );
}
