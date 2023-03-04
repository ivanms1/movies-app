import format from 'date-fns/format';
import { Dialog, Spinner, Icon } from '@blueprintjs/core';
import { Toast } from '../Toaster';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { MovieProps } from '../../@types';

import styles from './MovieModal.module.css';

interface MovieModalProps {
  isOpen: boolean;
  movieId: number;
  onClose: () => void;
  onClosed: () => void;
}

const getUserScoreColor = (score: number) => {
  if (score < 6) return 'danger';
  if (score < 8) return 'warning';
  return 'success';
};

const MovieModal = ({
  isOpen,
  movieId,
  onClose,
  onClosed,
}: MovieModalProps) => {
  const { data, error } = useQuery<MovieProps>(['movie', movieId], async () => {
    const { data } = await axios.get(`/api/movie?movieId=${movieId}`);
    return data?.data;
  });

  if (error) {
    Toast?.show({
      message: 'Oops, an error occurred',
      intent: 'danger',
    });

    onClose();
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      onClosed={onClosed}
      className={styles.Modal}
    >
      {data ? (
        <div
          style={{
            background: data.backdrop_path
              ? `url(${
                  process.env.NEXT_PUBLIC_IMAGE_BACKDROP_BASE_URL +
                  data.backdrop_path
                })`
              : '#ffb903',
          }}
          className={styles.Container}
        >
          <div className={styles.CloseIcon}>
            <Icon onClick={onClose} iconSize={30} icon='cross' />
          </div>

          <div className={styles.InfoContainer}>
            <h1 className={styles.Title}>
              {data.title} ({format(new Date(data.release_date), 'yyyy')})
            </h1>
            <div className={styles.Details}>
              <span>{format(new Date(data.release_date), 'dd/MM/yyyy')}</span>{' '}
              &bull;{' '}
              <span>{data.genres.map((genre) => genre.name).join(', ')}</span>
            </div>
            <div className={styles.ScoreAndTagline}>
              <div className={styles.ScoreContainer}>
                <span className={styles.Score}>
                  {(data.vote_average * 10).toFixed()}%
                </span>
                <Spinner
                  value={data.vote_average / 10}
                  intent={getUserScoreColor(data.vote_average)}
                />
              </div>
              <span className={styles.Tagline}>{data.tagline}</span>
            </div>

            <p className={styles.Overview}>{data.overview}</p>
          </div>
        </div>
      ) : (
        <div className={styles.LoadingContainer}>
          <Spinner intent='primary' />
        </div>
      )}
    </Dialog>
  );
};

export default MovieModal;
