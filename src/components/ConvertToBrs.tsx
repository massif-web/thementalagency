export const ConvertToBrs = ({ string }: { string: string }) =>
  string
    .split("\n")
    .map((item, index) =>
      index === 0 ? item : [<br key={`${item}-linebreak`} />, item],
    );
