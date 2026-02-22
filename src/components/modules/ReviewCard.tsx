
export interface ReviewData {
  id: string;
  userId: string;
  mealId: string;
  comment: string;
  rating: number;
  createdAt: string; 
  updatedAt: string; 
}
const ReviewCard = ({review}:{review:ReviewData}) => {
    console.log(review)
    return (
        <div>
            i ma review card
        </div>
    );
};

export default ReviewCard;