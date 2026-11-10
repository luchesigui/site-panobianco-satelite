export function assertRaffleVideo(probe) {
  const video = probe.streams?.[0];
  const duration = Number(probe.format?.duration);

  if (
    video?.codec_name !== "h264" ||
    video.width !== 1080 ||
    video.height !== 1920 ||
    video.avg_frame_rate !== "30/1"
  ) {
    throw new Error("O vídeo precisa ser H.264, 1080x1920 e 30 fps.");
  }

  if (!Number.isFinite(duration) || duration < 8) {
    throw new Error("O vídeo não atingiu a duração mínima de 8 segundos.");
  }
}
