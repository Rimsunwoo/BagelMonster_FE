export default function SignupForm() {
  // const {register} = useForm()
  return (
    <form className="flex flex-col gap-4 self-stretch">
      <label className="flex flex-col gap-2 text-label" htmlFor="id">
        아이디
        <input
          className="flex items-center gap-2 auth-input text-input"
          placeholder="아이디를 입력해주세요"
          type="text"
          id="id"
        />
      </label>
      <label className="flex flex-col gap-2 text-label" htmlFor="password">
        비밀번호
        <input
          className="flex items-center gap-2 auth-input text-input"
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
      </label>
      <label className="flex flex-col gap-2 text-label" htmlFor="passwordConfirm">
        비밀번호 확인
        <input
          className="flex items-center gap-2 auth-input text-input"
          placeholder="비밀번호를 한번 더 입력해주세요"
          type="password"
        />
      </label>
      <input
        className="flex justify-center items-center gap-2 auth-button text-button"
        type="button"
        value="회원가입"
      />
    </form>
  );
}
