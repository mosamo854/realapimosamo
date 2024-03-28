export interface TripGetResponse {
    uid: number;
    name: string;
    email: string;
    password: string;
    img_user: string;
    type: string;
}

export interface VoteGetResponse {
    vid: number;
    iid: number;
    uid: number;
    date: Date;
    score: number;
}

export interface ImageGetResponse {
    iid: number;
    uid: number;
    img: string;
    score_img: number;
}
