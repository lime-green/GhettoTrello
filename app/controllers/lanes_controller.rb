class LanesController < ApplicationController
    respond_to :json

    def index
        lane = Lane.all
        respond_with lane
    end

    def create
        lane = Lane.new lane_params
        if lane.save
            respond_with lane, :include => :cards
        else
            respond_with({ :errors => lane.errors.full_messages }, :status => 422, :location => nil)
        end
    end

    def show
        respond_with Lane.find(params[:id]), :include => :cards
    end

    def update
        lane = lane_find
        if lane.update_attributes(lane_params)
            head :no_content
        else
            render json: { :errors => lane.errors.full_messages }, :status => 422, :location => nil
        end
    end

    def destroy
        lane = lane_find
        if lane
            lane.destroy
            head :no_content
        end
    end

    private
    def lane_params
        params.require(:lane).permit(:name)
    end

    def lane_find
        Lane.find(params[:id])
    end
end
