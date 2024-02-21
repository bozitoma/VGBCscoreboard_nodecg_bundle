import { useCallback, useEffect, useState } from 'react';
import { replicantDefaultValues, type ReplicantMap } from '../../types/replicant';
import { klona as clone } from 'klona/json';

export const useReplicant = <T extends keyof ReplicantMap>(
  name: T
): [ReplicantMap[T] | undefined, (newValue: ReplicantMap[T]) => void] => {
  const [rep] = useState(() =>
    nodecg.Replicant(name, {
      defaultValue: replicantDefaultValues[name],
    })
  );

  const [value, setValue] = useState(rep.value);
  useEffect(() => {
    const handleChange = (newValue: ReplicantMap[T]) =>
      setValue((oldValue) => {
        if (newValue !== oldValue) {
          return newValue;
        }
        return clone(newValue);
      });
    rep.on('change', handleChange);
    return () => {
      rep.removeListener('change', handleChange);
    };
  }, [rep]);
  return [value, useCallback((newValue) => (rep.value = newValue), [rep])];
};
