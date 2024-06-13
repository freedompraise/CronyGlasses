const RelatedDrinks = (props) => {
  return (
    <div className="bg-white p-4 md:p-8 mt-8">
      <h2 className="text-center text-lg font-bold uppercase mb-4">
        CHECK OUT OUR COLLECTIONS
      </h2>
      <hr className="w-full mb-4" />
      <div className="grid sm:grid-cols-3 grid-cols-2 gap-4">
        {props.relatedDrinks &&
          props.relatedDrinks.slice(0, 3).map((drink, index) => (
            <a
              href={`/drinks/${drink.id}`}
              key={index}
              className="relative group"
            >
              <img
                src={drink.image}
                alt={`Drink ${index + 1}`}
                className="mx-2 overflow-hidden rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-500 ease-in-out group-hover:bg-opacity-50 flex items-center justify-center">
                <p className="text-3xl font-bold text-white font-sans text-center opacity-0 lg:block lg:group-hover:opacity-100">
                  {drink.name}
                </p>
              </div>
              <div className="text-center sm:hidden">{drink.name}</div>
            </a>
          ))}
      </div>
    </div>
  );
};

export default RelatedDrinks;
