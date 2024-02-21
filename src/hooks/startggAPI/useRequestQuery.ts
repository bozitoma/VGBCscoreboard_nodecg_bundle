export function useGetSlug() {
  const getEventSlug = (url: string): string => {
    if (!url.startsWith("https://www.start.gg/tournament/")) {
      return "";
    }
    const urlParts = url.split("/");
    if (urlParts.length < 7) {
      return "";
    }
    return `${urlParts[3]}/${urlParts[4]}/${urlParts[5]}/${urlParts[6]}`;
  };

  const getTournarySlug = (url: string): string => {
    if (!url.startsWith("https://www.start.gg/tournament/")) {
      return "";
    }
    const urlParts = url.split("/");
    return `${urlParts[3]}/${urlParts[4]}`;
  };

  const getPhaseID = (url: string): string => {
    if (!url.startsWith("https://www.start.gg/tournament/")) {
      return "";
    }
    const urlParts = url.split("/");
    return urlParts[8];
  };

  const getPhaseGroupID = (url: string): string => {
    if (!url.startsWith("https://www.start.gg/tournament/")) {
      return "";
    }
    const urlParts = url.split("/");
    return urlParts[9];
  };

  const requestQuery = async (url: string, query: string) => {
    if (!url) {
      return [];
    }
    const tournarySlug = getTournarySlug(url);
    const eventSlug = getEventSlug(url);
    const phaseId = getPhaseID(url);
    const phaseGroupId = getPhaseGroupID(url);
    if (
      tournarySlug === "" ||
      eventSlug === "" ||
      phaseId === "" ||
      phaseGroupId === ""
    ) {
      return [];
    }
    const variables = {
      tourneySlug: tournarySlug,
      eventSlug: eventSlug,
      phaseId: phaseId,
      phaseGroupId: phaseGroupId,
    };
    const res = await fetch(`https://api.smash.gg/gql/alpha`, {
      method: "POST",
      headers: {
        Authorization: "Bearer b02471b232fafc5d8a67c6e1fe9afd69",
        "Content-Type": "application/json",
        Accept: "application/json",
        encoding: "utf-8",
      },
      body: JSON.stringify({
        query: query,
        variables,
      }),
    }).then((res) => res.json());
    return res;
  };

  return { requestQuery };
}
