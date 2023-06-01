async function send_payload(uri, payload) {
  return await fetch(uri, {
    method: 'POST',
    body: payload,
  });
}

export async function slack_notification(type, data) {
  const SlackURI = process.env.SLACK_URL;
  if (!SlackURI) return;

  if (type === 'insert') {
    var payload = {
      attachments: [
        {
          fallback: `New report created by ${data.login}`,
          color: '#FADE4B',
          title: `${data.device} at ${data.host}`,
          text: data.description,
        },
      ],
    };
  } else if (type === 'update') {
    var payload = {
      attachments: [
        {
          fallback: `Report updated by ${data.login}`,
          color: '#FADE4B',
          title: `${data.device} at ${data.host}`,
          text: `Status set to \`${data.status}\`\n\n~${data.description}~`,
        },
      ],
    };
  } else {
    return;
  }

  const res = await send_payload(SlackURI, JSON.stringify(payload));

  return {
    status: res.status,
    body: await res.text(),
  };
}