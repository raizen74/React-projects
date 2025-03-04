export default function Input({ label, id, ...props }) {
  return (
    <p className='control'>
      {/* for is a reserved name in JS, so htmlFor is used to reference an input element*/}
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} required {...props} />
    </p>
  );
}
