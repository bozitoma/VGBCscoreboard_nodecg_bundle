import { useEffect, useState } from 'react';

type Props = {
  [key: string]: string;
};

export function useSpreadSheetAPI() {
  // 整形したスプレッドシートを格納するステート
  const [spreadSheetAPI, setSpreadSheet] = useState<Props[]>([]);

  // スプレッドシートのヘッダーをKeyに整形する関数
  const CsvDic = (props: string[][]) => {
    const [header, ...rows] = props;
    const newSpreadSheet: Props[] = rows.map((row: string[]) =>
      row.reduce(
        (acc: object, cell: string, i: number) => ({
          ...acc,
          [header[i]]: cell,
        }),
        {}
      )
    );
    return newSpreadSheet;
  };

  // ページ読み込み時にスプレッドシートを読み込む
  useEffect(() => {
    fetch(
      'https://sheets.googleapis.com/v4/spreadsheets/1TqdCdct1gkf7vbM7bNi1iXyZnQnkC1i9h60kmfbMXNw/values/list?key=AIzaSyDDds7LWxpwDzKKMzMs54m4pr1xryX6N1s'
    )
      .then((res) => res.json())
      .then((datas) => setSpreadSheet(CsvDic(datas.values)));
  }, []);

  // https://sheets.googleapis.com/v4/spreadsheets/{スプレッドシートID}/values/{シート名}?key={APIキー}
  // https://docs.google.com/spreadsheets/d/1TqdCdct1gkf7vbM7bNi1iXyZnQnkC1i9h60kmfbMXNw/edit?usp=sharing
  // melee icons
  // https://sheets.googleapis.com/v4/spreadsheets/1Z_kF6CKuzGSWveBIzy0dkSEYMeDvJ33eUpmLyzeDV_0/values/api?key=AIzaSyDDds7LWxpwDzKKMzMs54m4pr1xryX6N1s

  return { spreadSheetAPI };
}
