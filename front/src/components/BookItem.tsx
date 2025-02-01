interface BookItemProps {
  book: string;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  return <div>{book}</div>;
};

export default BookItem;
