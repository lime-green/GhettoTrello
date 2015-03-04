class CardsController < ApplicationController
    respond_to :json

    def index
        lane = lane_find
        if lane
            respond_with lane.cards
        end
    end

    def create
        lane = lane_find
        card = lane.cards.build(card_params)

        if card.save 
            respond_with lane, :include => :cards
        else
            respond_with({ :errors => card.errors.full_messages }, :status => 422, :location => nil)
        end
    end

    def update
        card = Card.find(params[:id])
        if card.update_attributes(card_params)
            respond_with card.lane
        else
            respond_with({ :errors => card.errors.full_messages }, :status => 422, :location => nil)
        end
    end

    def destroy
        lane = lane_find
        if lane
            card = lane.cards.find(params[:id])
            if card
                card.destroy
                head :no_content
            end
        end
    end

    private
    def card_params
        params.require(:card).permit(:content)
    end

    def lane_find
        Lane.find(params[:lane_id])
    end
end
